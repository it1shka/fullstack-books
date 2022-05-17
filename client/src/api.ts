import axios from "axios";
import { Book } from "./store";

class API {
  async getAllBooks() {
    try {
      const responce = await axios.get('/all')
      const books = responce.data as Book[]
      return books
    } catch(err) {
      console.log(err)
      return []
    }
  }

  async addBook(author: string, title: string) {
    try {
      const body = {author, title}
      const responce = await axios.post('/add', body)
      const book = responce.data as Book
      return book
    } catch(err) {
      console.log(err)
      return null
    }
  }

  async deleteBook(id: number) {
    const responce = await axios.delete(`/delete?id=${id}`)
    return responce.status === 200
  }

  async updateBook(book: Book) {
    try {
      const responce = await axios.put('/update', book)
      const updatedBook = responce.data as Book
      return updatedBook
    } catch(err) {
      console.log(err)
      return null
    }
  }
}

export default new API()