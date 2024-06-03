FROM postgres:latest

COPY entrypoint.sh /docker-entrypoint-initdb.d/entrypoint.sh
COPY backup/backup.sql /docker-entrypoint-initdb.d/backup.sql

RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh

ENTRYPOINT ["sh", "/docker-entrypoint-initdb.d/entrypoint.sh"]
