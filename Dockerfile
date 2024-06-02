FROM ubuntu:latest
LABEL authors="hp"

ENTRYPOINT ["top", "-b"]
CMD ["-n", "1"]
