# Load PostgreSQL credentials from .env file
if [ -f .env ]
then
    export $(grep -v '^#' .env | xargs)
    echo $PG_HOST
    echo $PG_PORT
    echo $PG_USER
fi

# Check if PostgreSQL is ready
while ! pg_isready -q -h $PG_HOST -p $PG_PORT -U $PG_USER
do
    echo "$(date) - waiting for database to start"
    sleep 2
done

echo "PostgreSQL is ready."