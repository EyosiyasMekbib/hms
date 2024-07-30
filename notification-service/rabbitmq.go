package main

import (
	"log"

	"github.com/rabbitmq/amqp091-go"
)

func connectRabbitMQ() (*amqp091.Connection, *amqp091.Channel) {
	conn, err := amqp091.Dial(getEnv("RABBITMQ_URL"))
	if err != nil {
		log.Fatalf("%s: %s", "Failed to connect to RabbitMQ", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("%s: %s", "Failed to open a channel", err)
	}

	return conn, ch
}
