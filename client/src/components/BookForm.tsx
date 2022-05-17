import styled from "styled-components"
import React, {FormEvent, useState} from 'react'
import { useSetRecoilState,  useRecoilState } from "recoil"
import { booksAtom, updatingBookAtom } from "../store"
import api from "../api"

const BookForm = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const [updating, setUpdating] = useRecoilState(updatingBookAtom)
  const setBooks = useSetRecoilState(booksAtom)

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    if(updating) {
      api.updateBook(updating).then(book => {
        if(!book) {
          alert('Failed to update book!')
          return
        }
        setBooks(prev => prev.map(nxtbook => {
          if(nxtbook.id === book.id) {
            return book
          }
          return nxtbook
        }))
        setUpdating(null)
      })
      return
    }

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

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if(updating) {
      setUpdating(prev => ({...prev!, author: value}))
    } else {
      setAuthor(value)
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if(updating) {
      setUpdating(prev => ({...prev!, title: value}))
    } else {
      setTitle(value)
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Input required
        placeholder="Author..."
        value={updating ? updating.author : author}
        onChange={handleAuthorChange}
      />
      <Input required
        placeholder="Title..."
        value={updating ? updating.title : title}
        onChange={handleTitleChange}
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