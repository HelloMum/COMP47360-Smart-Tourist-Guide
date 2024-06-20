import docker
client = docker.from_env()
client.containers.run("ubuntu", "echo hello world") # Demo Run contatiner
print(client.containers.list(all=True)) # List all containers
