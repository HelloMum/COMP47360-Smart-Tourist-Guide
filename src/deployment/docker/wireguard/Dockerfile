# Use WireGuard
FROM lscr.io/linuxserver/wireguard:latest

# Set environment variables
ENV PUID=1000 \
    PGID=1000 \
    TZ=Etc/UTC \
    SERVERURL=137.43.49.27 \
    SERVERPORT=51820 \
    PEERS=20 \
    PEERDNS=true \
    INTERNAL_SUBNET=10.11.12.0/24 \
    ALLOWEDIPS=10.11.12.0/24 \
    PERSISTENTKEEPALIVE_PEERS=true\
    LOG_CONFS=true


# Expose WireGuard port
EXPOSE 51820/udp

# Run WireGuard container
CMD ["--name=wireguard", \
     "--network=wireguard_network", \
     "--cap-add=NET_ADMIN", \
     "--cap-add=SYS_MODULE", \
     "-e", "PUID=${PUID}", \
     "-e", "PGID=${PGID}", \
     "-e", "TZ=${TZ}", \
     "-e", "SERVERURL=${SERVERURL}", \
     "-e", "SERVERPORT=${SERVERPORT}", \
     "-e", "PEERS=${PEERS}", \
     "-e", "PEERDNS=${PEERDNS}", \
     "-e", "INTERNAL_SUBNET=${INTERNAL_SUBNET}", \
     "-e", "ALLOWEDIPS=${ALLOWEDIPS}", \
     "-e", "PERSISTENTKEEPALIVE_PEERS=${PERSISTENTKEEPALIVE_PEERS}", \
     "-e", "LOG_CONFS=${LOG_CONFS}", \
     "--dns=dnsmasq", \
     "-p", "51820:51820/udp", \
     "-v", "/path/to/wireguard/config:/config", \
     "-v", "/lib/modules:/lib/modules", \
     "--sysctl=net.ipv4.conf.all.src_valid_mark=1", \
     "--restart=unless-stopped", \
     "lscr.io/linuxserver/wireguard:latest"]