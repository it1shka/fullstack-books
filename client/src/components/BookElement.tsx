import styled from "styled-components"
import { Book } from "../store"

const BookElement = ({book}: {book: Book}) => {
  const {author, title} = book
  return (
    <BookContainer>
      <p>{author}</p>
      <p>{title}</p>
    </BookContainer>
  )
}

const BookContainer = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.75em 1em;
  border-left: 0px solid white;
  cursor: pointer;

  transition: padding-left 0.3s, color 0.3s, border-left 0.2s ease;
  &:hover {
    padding-left: 25px;
    color: #3900d4;
    border-left: 3px solid grey;
  }
`

export default BookElement