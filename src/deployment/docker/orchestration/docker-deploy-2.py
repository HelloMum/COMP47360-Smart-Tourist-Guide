import argparse
import subprocess
import docker
import os
import time
import inquirer

# Load environment variables
POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'password')
POSTGRES_DB = os.getenv('POSTGRES_DB', 'mydatabase')

client = docker.from_env()

# Function to create and start containers
def create_and_start_container(service_name, **kwargs):
    try:
        container = client.containers.run(
            **kwargs,
            name=service_name,
            detach=True,
            restart_policy={"Name": "unless-stopped"}
        )
        print(f"{service_name} started")
        return container
    except docker.errors.APIError as e:
        print(f"Error starting {service_name}: {e}")
        return None

# Function to checkout branches
def checkout_branch(repo_path, branch_name):
    subprocess.run(['git', '-C', repo_path, 'fetch'], check=True)
    subprocess.run(['git', '-C', repo_path, 'checkout', branch_name], check=True)

# Function to get branches from a GitHub repository
def get_branches(repo_path):
    result = subprocess.run(['gh', 'repo', 'view', '--json', 'refs', '--jq', '.refs | map(select(.refType=="branch")) | .[].name'], capture_output=True, text=True, cwd=repo_path)
    branches = result.stdout.strip().split('\n')
    return branches

# Function to ask user to select a branch
def select_branch(repo_path, service_name):
    branches = get_branches(repo_path)
    question = [inquirer.List(service_name, message=f"Select branch for {service_name}", choices=branches)]
    answers = inquirer.prompt(question)
    return answers[service_name]

# Parse command line arguments
parser = argparse.ArgumentParser(description="Deploy Docker services with branch selection.")
parser.add_argument('--network-name', required=True, help='Name of the Docker network')
parser.add_argument('--frontend-port', type=int, default=3000, help='External port for the frontend service')
parser.add_argument('--backend-port', type=int, default=8080, help='External port for the backend service')
parser.add_argument('--scrappers-port', type=int, default=8081, help='External port for the scrappers service')
parser.add_argument('--db-port', type=int, default=5432, help='External port for the database service')

args = parser.parse_args()

# Checkout the selected branches
frontend_branch = select_branch('./src/frontend/react', 'frontend')
checkout_branch('./src/frontend/react', frontend_branch)

backend_branch = select_branch('./src/backend/spring', 'backend')
checkout_branch('./src/backend/spring', backend_branch)

scrappers_branch = select_branch('./src/backend/scrappers', 'scrappers')
checkout_branch('./src/backend/scrappers', scrappers_branch)

# Create network
try:
    network = client.networks.create(args.network_name, driver="bridge")
    print(f"Network {args.network_name} created")
except docker.errors.APIError as e:
    print(f"Error creating network {args.network_name}: {e}")
    network = client.networks.get(args.network_name)
    print(f"Using existing network {args.network_name}")

# Wireguard service
wireguard = create_and_start_container(
    'wireguard-client',
    image='your_wireguard_image',  # Replace with your Wireguard image
    cap_add=['NET_ADMIN', 'SYS_MODULE'],
    volumes={'/lib/modules': {'bind': '/lib/modules', 'mode': 'rw'}},
    environment={
        'PUID': '1000',
        'PGID': '1000',
        'TZ': 'Europe/London'
    },
    sysctls={'net.ipv4.conf.all.src_valid_mark': '1'},
    network=args.network_name
)

# Database service
db = create_and_start_container(
    'db',
    image='postgres:latest',
    environment={
        'POSTGRES_USER': POSTGRES_USER,
        'POSTGRES_PASSWORD': POSTGRES_PASSWORD,
        'POSTGRES_DB': POSTGRES_DB
    },
    volumes={'db-data': {'bind': '/var/lib/postgresql/data', 'mode': 'rw'}},
    ports={f'{args.db_port}/tcp': args.db_port},
    healthcheck={
        'test': ['CMD-SHELL', f"pg_isready -U {POSTGRES_USER} -d {POSTGRES_DB}"],
        'interval': 5,
        'timeout': 5,
        'retries': 5
    },
    stop_signal='SIGTERM',
    stop_grace_period=30,
    network=args.network_name
)

# Wait for the database to be ready
time.sleep(30)

# Backend service
backend = create_and_start_container(
    'backend',
    build={'context': './src/backend/spring'},
    ports={f'{args.backend_port}/tcp': args.backend_port},
    environment={
        'SPRING_DATASOURCE_URL': f'jdbc:postgresql://db:5432/{POSTGRES_DB}',
        'SPRING_DATASOURCE_USERNAME': POSTGRES_USER,
        'SPRING_DATASOURCE_PASSWORD': POSTGRES_PASSWORD
    },
    depends_on={'db': {'condition': 'service_healthy'}},
    network=args.network_name
)

# Scrappers service
scrappers = create_and_start_container(
    'scrappers',
    build={'context': './src/backend/scrappers'},
    ports={f'{args.scrappers_port}/tcp': args.scrappers_port},
    environment={
        'SPRING_DATASOURCE_URL': f'jdbc:postgresql://db:5432/{POSTGRES_DB}',
        'SPRING_DATASOURCE_USERNAME': POSTGRES_USER,
        'SPRING_DATASOURCE_PASSWORD': POSTGRES_PASSWORD
    },
    depends_on={'db': {'condition': 'service_healthy'}},
    network=args.network_name
)

# Frontend service
frontend = create_and_start_container(
    'frontend',
    build={'context': './src/frontend/react'},
    ports={f'{args.frontend_port}/tcp': args.frontend_port},
    environment={
        'REACT_APP_BACKEND_URL': f'http://backend:{args.backend_port}'
    },
    healthcheck={
        'test': ['CMD', 'curl', '-f', 'http://localhost:3000'],
        'interval': 30,
        'timeout': 10,
        'retries': 3
    },
    depends_on={'backend': {'condition': 'service_started'}},
    network=args.network_name
)

# Backup service
backup = create_and_start_container(
    'backup',
    image='postgres:latest',
    depends_on={'db': {'condition': 'service_healthy'}},
    command=["bash", "-c", f"while true; do PGPASSWORD={POSTGRES_PASSWORD} pg_dump -U {POSTGRES_USER} -h db {POSTGRES_DB} > /backup/backup_$(date +%Y%m%d_%H%M%S).sql; sleep 3600; done"],
    network=args.network_name
)

