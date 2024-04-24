#!/bin/bash

# Run docker-compose
docker-compose -f docker-compose.yml up -d

# Check if docker-compose executed successfully
if [ $? -eq 0 ]; then
    echo "Docker Compose executed successfully."

    # Run pgready.sh
    ./pgready.sh

    # Check if pgready.sh executed successfully
    if [ $? -eq 0 ]; then
        echo "pgready.sh executed successfully."
    else
        echo "Error executing pgready.sh."
    fi
else
    echo "Error executing Docker Compose."
fi
# No additional code is needed at the placeholder.