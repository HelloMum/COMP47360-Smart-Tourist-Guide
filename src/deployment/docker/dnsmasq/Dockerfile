# Use the official Docker image for DNSmasq
FROM dockurr/dnsmasq:latest

# Expose DNS port
EXPOSE 53/udp

# Run DNSmasq container
CMD ["--name=dnsmasq", \
     "--restart=unless-stopped", \
     "--network=wireguard_network", \
     "--cap-add=NET_ADMIN", \
     "--dns=8.8.8.8", \
     "-p", "53:53/udp", \
     "dockurr/dnsmasq", \
     "--address=/dev.sodium/10.11.12.2"]
