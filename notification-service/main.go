package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	config := LoadConfig()
	rabbitMQConn, err := connectRabbitMQ("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %s", err)
	}
	defer rabbitMQConn.Close()

	handler := &Handler{
		RabbitMQConn: rabbitMQConn,
		Config:       config,
	}
	r := mux.NewRouter()
	r.HandleFunc("/send", handler.SendNotification).Methods("POST")

	// Add CORS headers
	headers := handlers.AllowedHeaders([]string{"Content-Type"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	log.Printf("Starting server on port %s...", config.Port)
	if err := http.ListenAndServe(":"+config.Port, handlers.CORS(headers, methods, origins)(r)); err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}
}
