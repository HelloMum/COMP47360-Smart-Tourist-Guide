#!/bin/bash
set -e

# Wait for PostgreSQL to start
until pg_isready -h localhost; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# Drop the existing database this is just for clean testing
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  DROP DATABASE IF EXISTS $POSTGRES_DB;
  CREATE DATABASE $POSTGRES_DB;
EOSQL

# Restore the database from the backup
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" < /docker-entrypoint-initdb.d/backup.sql

# Call the original entrypoint script from the postgres image to continue
/docker-entrypoint.sh postgres