package main

import "time"

type Notification struct {
    ID        string    `json:"id"`
    UserID    string    `json:"user_id"`
    Message   string    `json:"message"`
    CreatedAt time.Time `json:"created_at"`
}
