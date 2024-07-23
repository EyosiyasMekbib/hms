package main

import (
	"encoding/json"
	"net/http"

	"gopkg.in/gomail.v2"
)

type Notification struct {
	Message string `json:"message"`
	ToEmail string `json:"to_email"`
}

func (h *Handler) SendNotification(w http.ResponseWriter, r *http.Request) {
	var notification Notification
	if err := json.NewDecoder(r.Body).Decode(&notification); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if err := h.PublishMessage(notification); err != nil {
		http.Error(w, "Failed to publish message", http.StatusInternalServerError)
		return
	}

	if err := h.SendEmail(notification); err != nil {
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte("Notification sent"))
}

func (h *Handler) SendEmail(notification Notification) error {
	m := gomail.NewMessage()
	m.SetHeader("From", h.Config.FromEmail)
	m.SetHeader("To", notification.ToEmail)
	m.SetHeader("Subject", "New Notification")
	m.SetBody("text/plain", notification.Message)

	d := gomail.NewDialer(h.Config.SMTPHost, h.Config.SMTPPort, h.Config.SMTPUser, h.Config.SMTPPassword)

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
