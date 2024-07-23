package main

import (
	"log"

	"github.com/rabbitmq/amqp091-go"
)

func connectRabbitMQ(rabbitMQUrl string) (*amqp091.Connection, error) {
	log.Println(rabbitMQUrl)
	conn, err := amqp091.Dial(rabbitMQUrl)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %s", err)
	}
	return conn, nil
}
