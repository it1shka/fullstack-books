package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"it1shka.com/books-server/database"
	"it1shka.com/books-server/routes"
)

func main() {
	database.Connect()
	app := fiber.New()
	app.Use(cors.New())
	routes.Setup(app)
	app.Listen(":8080")
}
