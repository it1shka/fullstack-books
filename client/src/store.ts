import { atom } from "recoil";

export interface Book {
  id: number
  author: string
  title: string
}

export const booksAtom = atom<Book[]>({
  key: 'books',
  default: []
})

export const currentAtom = atom<number | null>({
  key: 'current',
  default: null
})

export const updatingBookAtom = atom<Book | null>({
  key: 'updatingBook',
  default: null
})