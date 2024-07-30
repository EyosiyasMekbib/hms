package main

import (
    "github.com/gorilla/mux"
    "log"
    "net/http"
)

func main() {
    router := mux.NewRouter()
    router.HandleFunc("/api/notifications", createNotificationHandler).Methods("POST")

    port := getEnv("PORT")
    log.Printf("Server running on port %s", port)
    log.Fatal(http.ListenAndServe(":"+port, router))
}
