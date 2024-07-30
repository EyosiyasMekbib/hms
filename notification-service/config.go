package main

import (
    "github.com/joho/godotenv"
    "log"
    "os"
)

func loadEnv() {
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file")
    }
}

func getEnv(key string) string {
    return os.Getenv(key)
}
