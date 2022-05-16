package routes

import (
	"github.com/gofiber/fiber/v2"
	"it1shka.com/books-server/controllers"
)

func Setup(app *fiber.App) {
	app.Get("/all", controllers.RetrieveAllBooks)
	app.Post("/add", controllers.AppendBook)
	app.Delete("/delete", controllers.DeleteBook)
	app.Put("/update", controllers.AmendBook)
}
