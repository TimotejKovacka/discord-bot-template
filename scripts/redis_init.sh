#!/bin/bash

# Constants
REDIS_CONTAINER_NAME="redis-discord-bot"
REDIS_IMAGE="redis:latest"

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "Docker is not installed. Please install Docker and try again."
        exit 1
    else
        echo "Docker is installed."
    fi
}

# Function to pull Redis image if not present
pull_redis_image() {
    if [[ "$(docker images -q ${REDIS_IMAGE} 2> /dev/null)" == "" ]]; then
        echo "Redis Docker image not found. Pulling Redis image..."
        docker pull ${REDIS_IMAGE}
    else
        echo "Redis Docker image is already pulled."
    fi
}

# Function to start Redis container
start_redis_container() {
    if [ $(docker ps -q -f name=${REDIS_CONTAINER_NAME}) ]; then
        echo "Redis container is already running."
    elif [ $(docker ps -aq -f status=exited -f name=${REDIS_CONTAINER_NAME}) ]; then
        echo "Starting existing Redis container..."
        docker start ${REDIS_CONTAINER_NAME}
    else
        echo "Running a new Redis container..."
        docker run --name ${REDIS_CONTAINER_NAME} -p 6379:6379 -d ${REDIS_IMAGE}
    fi
}

# Main script execution
check_docker
pull_redis_image
start_redis_container