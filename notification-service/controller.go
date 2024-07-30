package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

var channel *amqp091.Channel

func init() {
	loadEnv()
	_, ch := connectRabbitMQ()
	channel = ch
}

func publishNotification(notification Notification) error {
	body, err := json.Marshal(notification)
	if err != nil {
		return err
	}

	err = channel.Publish(
		"",              // exchange
		"notifications", // routing key
		false,           // mandatory
		false,           // immediate
		amqp091.Publishing{
			ContentType: "application/json",
			Body:        body,
		})
	return err
}

func createNotificationHandler(w http.ResponseWriter, r *http.Request) {
	var notification Notification
	err := json.NewDecoder(r.Body).Decode(&notification)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	notification.ID = generateID()
	notification.CreatedAt = time.Now()

	err = publishNotification(notification)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(notification)
}

func generateID() string {
	return time.Now().Format("20060102150405")
}
