import styled from "styled-components"
import {FormEvent, useState} from 'react'
import { useRecoilState } from "recoil"
import booksAtom from "../store"
import api from "../api"

const BookForm = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const [_, setBooks] = useRecoilState(booksAtom)

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    api.addBook(author, title).then(book => {
      if(!book) {
        window.alert('Failed to add a book!')
        return
      }
      setBooks(prev => [...prev, book])
    })
    setAuthor('')
    setTitle('')
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Input
        placeholder="Author..."
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <Input
        placeholder="Title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > * + * {
    margin-left: 0.5em;
  }
  padding: 0.25em 0.5em;
`

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: inherit;
  padding: 0.25em 0.5em;
  border-bottom: 2px solid #ddd;
  transition: 0.2s border-bottom 0s;
  &:focus {
    border-bottom: 2px solid #3900d4;
    color: #3900d4;
  }
`

const Button = styled.button`
  border: none;
  min-width: 60px;
  transition: 0.2s all 0s;
  &:hover {
    background-color: #ddd;
  }
`

export default BookForm