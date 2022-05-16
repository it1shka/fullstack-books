package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"it1shka.com/books-server/models"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(sqlite.Open("database.db"))
	if err != nil {
		panic("DB: Failed to connect")
	}

	connection.AutoMigrate(&models.Book{})

	DB = connection
}
