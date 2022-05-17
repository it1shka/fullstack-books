import React from "react"
import styled from "styled-components"
import { Book, booksAtom, currentAtom, updatingBookAtom } from "../store"
import api from "../api"
import { useRecoilState, useSetRecoilState } from "recoil"

const BookElement = ({book}: {book: Book}) => {
  const {author, title, id} = book
  const [current, setCurrent] = useRecoilState(currentAtom)
  const setBooks = useSetRecoilState(booksAtom)
  const [updating, setUpdating] = useRecoilState(updatingBookAtom)

  const handleClick = () => {
    if(id === current) {
      setCurrent(null)
    } else {
      setCurrent(id)
    }
  }

  const Delete = async () => {
    if(updating?.id === id) {
      setUpdating(null)
    }
    if(current === id) {
      setCurrent(null)
    }

    api.deleteBook(id).then(result => {
      if(!result) {
        alert('Failed to delete a book!')
      }
      setBooks(prev => prev.filter(book => {
        return book.id !== id
      }))
    })
  }

  const Update = (event: React.MouseEvent) => {
    event.preventDefault()
    if(id === updating?.id) {
      setUpdating(null)
    } else {
      setUpdating(book)
    }
  }

  return (
    <>
    <BookContainer onClick={handleClick}>
      <p>{author}</p>
      <p>{title}</p>
    </BookContainer>
    {id === current && (
    <ButtonsContainer>
      <p>Options: </p>
      <Button color="#d42f15" onClick={Delete}>Delete</Button>
      <Button color="#11b4d1" onClick={Update}>Update</Button>
    </ButtonsContainer>
    )}
    </>
  )
}

const BookContainer = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.75em 1em;
  border-left: 0px solid white;
  cursor: pointer;
  user-select: none;
  transition: padding-left 0.3s, color 0.3s, border-left 0.2s ease;
  &:hover {
    padding-left: 25px;
    color: #3900d4;
    border-left: 3px solid grey;
  }
`

const ButtonsContainer = styled.li`
  padding: 0.1em 1em;
  display: flex;
  align-items: center;
  color: #3900d4;
  & > * + * {
    margin-left: 0.5em;
  }
`

const Button = styled.button<{color:string}>`
  border: none;
  font-size: inherit;
  padding: 0.2em 0.5em;
  color: white;
  background-color: ${({color}) => color};
`

export default BookElement