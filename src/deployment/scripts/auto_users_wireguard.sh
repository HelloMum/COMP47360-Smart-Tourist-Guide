#!/bin/bash
# chmod +x generate_wireguard_config.sh before running
# Create directory for configuration files
mkdir -p wireguard_configs

# Function to generate keys, genkey MUST be installed
generate_keys() {
    for ((i=1; i<=$1; i++)); do
        wg genkey | tee wireguard_configs/peer${i}_private_key | wg pubkey > wireguard_configs/peer${i}_public_key
    done
}

# Function to generate client configurations and server peer configuration
generate_client_configs() {
    local num_clients=$1
    local ip_start=$2
    local server_public_ip=$3
    local server_listen_port=$4

    server_config="/etc/wireguard/wg0.conf"

    for ((i=1; i<=$num_clients; i++)); do
        local ip_end=$((ip_start + i - 1))
        config_file="wireguard_configs/wg_client${i}.conf"
        preshared_key=$(wg genpsk)  # Generate a unique pre-shared key for each client

        # Create client configuration file
        echo "" >> $server_config
        echo "[Interface]" > $config_file
        echo "PrivateKey = $(cat wireguard_configs/peer${i}_private_key)" >> $config_file
        echo "Address = 10.11.12.${ip_end}/24" >> $config_file
        echo "" >> $config_file

        echo "[Peer]" >> $config_file
        echo "PublicKey = $server_public_key" >> $config_file
        echo "PresharedKey = $preshared_key" >> $config_file
        echo "Endpoint = $server_public_ip:$server_listen_port" >> $config_file
        echo "AllowedIPs = 0.0.0.0/0" >> $config_file
        echo "" >> $config_file

        # Append to server configuration file
        echo "[Peer]" >> $server_config
        echo "PublicKey = $(cat wireguard_configs/peer${i}_public_key)" >> $server_config
        echo "PresharedKey = $preshared_key" >> $server_config
        echo "AllowedIPs = 0.0.0.0/0" >> $server_config
        echo "" >> $server_config
    done
}

read -p "How many clients do you want to generate keys for? " num_clients
read -p "Enter the starting IP address (e.g., 10.11.12.XXX): " ip_start
read -p "Server PublicKey" server_public_key

server_public_ip=$(curl -s ifconfig.me)  # Fetch the public IP address using curl
server_listen_port=51820  # Default port for WireGuard

# Generate keys for clients
generate_keys $num_clients

# Generate client configurations and append them to a single file for server
generate_client_configs $num_clients $ip_start $server_public_ip $server_listen_port

echo "Configuration files have been created and saved to /etc/wireguard/wg0.conf."
