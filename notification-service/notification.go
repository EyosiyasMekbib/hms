package main

import (
	"log"

	"github.com/rabbitmq/amqp091-go"
)

type Handler struct {
	RabbitMQConn *amqp091.Connection
	Config       *Config
}

func (h *Handler) PublishMessage(notification Notification) error {
	ch, err := h.RabbitMQConn.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"notifications",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	body := notification.Message
	err = ch.Publish(
		"",
		q.Name,
		false,
		false,
		amqp091.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	if err != nil {
		return err
	}

	log.Printf(" [x] Sent %s", body)
	return nil
}
