FROM ubuntu:latest
LABEL authors="hp"

ENTRYPOINT ["top", "-b"]