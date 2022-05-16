import { useEffect } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import api from "../api"
import booksAtom from "../store"
import BookElement from "./BookElement"

const BookList = () => {

  const [books, setBooks] = useRecoilState(booksAtom)

  useEffect(() => {
    api.getAllBooks().then(books => {
      setBooks(books)
    })
  }, [])

  return (
    <List>
      {books.map((book, idx) => (
        <BookElement book={book} key={idx}/>
      ))}
    </List>  
  )
}

const List = styled.ul`
  list-style-type: none;
`

export default BookList