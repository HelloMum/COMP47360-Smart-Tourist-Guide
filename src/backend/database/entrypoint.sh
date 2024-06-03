#!/bin/sh

# Function to perform the backup when asked not actually using the correct implementation just a test
backup_db() {
  echo "Creating a backup..."
  pg_dump -U $POSTGRES_USER -d $POSTGRES_DB -F c -f /backups/backup_$(date +%Y%m%d%H%M%S).dump
  echo "Backup created."
}

# Trap the SIGTERM signal to trigger the backup before exiting
trap 'backup_db; exit 0' SIGTERM

# Start PostgreSQL server
echo "Starting PostgreSQL..."
docker-entrypoint.sh postgres &

# Wait for PostgreSQL to be ready
until pg_isready -h "localhost" -p "5432" > /dev/null 2> /dev/null; do
  echo "Waiting for database to be ready..."
  sleep 2
done

# Restore the database from backup.sql if it exists
if [ -f /docker-entrypoint-initdb.d/backup.sql ]; then
  echo "Restoring the database from backup.sql..."
  psql -U $POSTGRES_USER -d $POSTGRES_DB -f /docker-entrypoint-initdb.d/backup.sql
fi

# Wait indefinitely to keep the container running
wait
