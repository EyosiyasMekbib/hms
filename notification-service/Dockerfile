# Use the official Golang image as the base image
FROM golang:1.22.5

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

COPY *.go ./

RUN go mod tidy


RUN go build -o /notification-service

COPY wait-for-it.sh ./
EXPOSE 8080

CMD [ "/notification-service" ]
