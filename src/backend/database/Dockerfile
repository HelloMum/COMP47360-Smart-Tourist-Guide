FROM postgres:latest

ENV POSTGRES_USER ${POSTGRES_USER}
ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
ENV POSTGRES_DB ${POSTGRES_DB}

COPY entrypoint.sh /docker-entrypoint-initdb.d/
COPY backup/backup.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/entrypoint.sh

EXPOSE 5432

ENTRYPOINT ["/docker-entrypoint-initdb.d/entrypoint.sh"]
