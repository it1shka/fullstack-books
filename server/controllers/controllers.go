package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"it1shka.com/books-server/database"
	"it1shka.com/books-server/models"
)

func RetrieveAllBooks(c *fiber.Ctx) error {
	var books []models.Book
	if result := database.DB.Find(&books); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "failed to retrieve books",
		})
	}
	return c.JSON(books)
}

func AppendBook(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.Status(403).JSON(fiber.Map{
			"message": "wrong body parameters",
		})
	}
	title, author := data["title"], data["author"]
	book := models.Book{
		Title:  title,
		Author: author,
	}
	database.DB.Create(&book)
	// return c.JSON(fiber.Map{
	// 	"message": "successfully added",
	// })
	return c.JSON(&book)
}

func DeleteBook(c *fiber.Ctx) error {
	strid := c.Query("id")
	if len(strid) == 0 {
		database.DB.Delete(&models.Book{})
		return c.JSON(fiber.Map{
			"message": "successfully deleted all books",
		})
	}
	id, err := strconv.ParseUint(strid, 10, 32)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "failed to parse book id",
		})
	}
	database.DB.Delete(&models.Book{}, id)
	return c.JSON(fiber.Map{
		"message": "successfully deleted a book",
	})
}

func AmendBook(c *fiber.Ctx) error {
	var book models.Book
	if err := c.BodyParser(&book); err != nil {
		return c.Status(403).JSON(fiber.Map{
			"message": "wrong body parameters",
		})
	}
	if database.DB.Model(&book).Where("id = ?", book.Id).Updates(&book).RowsAffected == 0 {
		database.DB.Create(&book)
	}
	// return c.JSON(fiber.Map{
	// 	"message": "successfully updated",
	// })
	return c.JSON(&book)
}
