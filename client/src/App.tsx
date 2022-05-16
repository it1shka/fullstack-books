import styled from "styled-components"
import BookForm from "./components/BookForm"
import BookList from "./components/BookList"

const App = () => {
  return (
    <Container>
      <BookList />
      <BookForm />
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 720px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: #ccc 1px 1px 4px;
`

export default App