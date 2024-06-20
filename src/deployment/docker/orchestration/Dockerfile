FROM python:3.12.3-slim

WORKDIR /usr/src/app

COPY .. .

RUN pip install --no-cache-dir pyyaml

CMD ["python", "./create_compose.py"]
