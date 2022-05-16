import { atom } from "recoil";

export interface Book {
  id: number
  author: string
  title: string
}

const initial: Book[] = []

const booksAtom = atom({
  key: 'books',
  default: initial
})

export default booksAtom