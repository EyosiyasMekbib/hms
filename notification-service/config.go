package main

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	Port         string
	RabbitMQUrl  string
	SMTPHost     string
	SMTPPort     int
	SMTPUser     string
	SMTPPassword string
	FromEmail    string
}

func LoadConfig() *Config {
	viper.SetConfigFile(".env")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}

	config := &Config{
		Port:         viper.GetString("PORT"),
		RabbitMQUrl:  viper.GetString("RABBITMQ_URL"),
		SMTPHost:     viper.GetString("SMTP_HOST"),
		SMTPPort:     viper.GetInt("SMTP_PORT"),
		SMTPUser:     viper.GetString("SMTP_USER"),
		SMTPPassword: viper.GetString("SMTP_PASSWORD"),
		FromEmail:    viper.GetString("FROM_EMAIL"),
	}

	return config
}
