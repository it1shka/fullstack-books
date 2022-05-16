package models

type Book struct {
	Id     uint   `gorm:"primaryKey;autoIncrement;notNull" json:"id"`
	Author string `json:"author"`
	Title  string `json:"title"`
}
