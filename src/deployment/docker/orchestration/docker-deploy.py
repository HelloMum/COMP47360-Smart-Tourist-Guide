import docker
import yaml

client = docker.from_env()


def create_docker_compose(exit_port):
    compose_content = {
        'version': '3.8',
        'services': {
            'frontend': {
                'build': {
                    'context': './src/frontend/react'
                },
                'ports': [f'{exit_port}:3000'],
                'depends_on': ['backend']
            },
            'backend': {
                'build': {
                    'context': './src/backend/spring'
                },
                'ports': ['8080:8080'],
                'environment': [
                    'SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/dev_db',
                    'SPRING_DATASOURCE_USERNAME=dev_user',
                    'SPRING_DATASOURCE_PASSWORD=dev_password'
                ],
                'depends_on': ['db']
            },
            'db': {
                'image': 'postgres:latest',
                'environment': {
                    'POSTGRES_USER': 'dev_user',
                    'POSTGRES_PASSWORD': 'dev_password',
                    'POSTGRES_DB': 'dev_db'
                },
                'volumes': ['db-data:/var/lib/postgresql/data']
            }
        },
        'volumes': {
            'db-data': {}
        }
    }

    with open('docker-compose.yml', 'w') as file:
        yaml.dump(compose_content, file)


if __name__ == '__main__':
    import sys

    if len(sys.argv) != 2:
        print("Usage: python create_compose.py <frontend_port>")
        sys.exit(1)

    frontend_port = sys.argv[1]
    create_docker_compose(frontend_port)
