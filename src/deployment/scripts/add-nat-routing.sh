#!/bin/bash
IPT="/sbin/iptables"
#IPT6="/sbin/ip6tables"

IN_FACE="ens18"                   # NIC connected to the internet
WG_FACE="wg0"                    # WG NIC
SUB_NET="10.11.12.0/24"            # WG IPv4 sub/net aka CIDR
WG_PORT="51194"                  # WG udp port
#SUB_NET_6="fd42:42:42:42::/112"  # WG IPv6 sub/net

## IPv4 ##
$IPT -t nat -I POSTROUTING 1 -s $SUB_NET -o $IN_FACE -j MASQUERADE
$IPT -I INPUT 1 -i $WG_FACE -j ACCEPT
$IPT -I FORWARD 1 -i $IN_FACE -o $WG_FACE -j ACCEPT
$IPT -I FORWARD 1 -i $WG_FACE -o $IN_FACE -j ACCEPT
$IPT -I INPUT 1 -i $IN_FACE -p udp --dport $WG_PORT -j ACCEPT

## IPv6 (Uncomment) ##
## $IPT6 -t nat -I POSTROUTING 1 -s $SUB_NET_6 -o $IN_FACE -j MASQUERADE
## $IPT6 -I INPUT 1 -i $WG_FACE -j ACCEPT
## $IPT6 -I FORWARD 1 -i $IN_FACE -o $WG_FACE -j ACCEPT
## $IPT6 -I FORWARD 1 -i $WG_FACE -o $IN_FACE -j ACCEPT
