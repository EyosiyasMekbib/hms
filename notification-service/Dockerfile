# Use the official Golang image as the base image
FROM golang:1.23rc2

# Set the working directory
WORKDIR /usr/src/app

# Copy the Go module files
COPY go.mod go.sum ./

# Install dependencies
RUN go mod tidy

# Copy the rest of the application code
COPY . .

# Make the wait-for-it script executable
RUN chmod +x wait-for-it.sh

# Build the Go application
RUN go build -o main .

# Expose the port the app runs on
EXPOSE 5006

# Define the command to run the app
CMD ["./wait-for-it.sh", "rabbitmq", "./main"]
