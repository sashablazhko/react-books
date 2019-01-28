import Api from "./Api";
import { arrToMap, handleResponse } from "../helpers";
import { ChapterRecord } from "../redux/reducers/books.reducer";

export const booksService = {
  getBooks,
  getBook,
  getChapterText,
};

function getBooks() {
  return Api()
    .get("/books")
    .then(handleResponse)
    .then(books => {
      const booksToMap = books.map(item => {
        item.chapters = arrToMap(item.chapters, "id_chapter", ChapterRecord);
        return item;
      });
      return booksToMap;
    });
}

function getBook(idBook) {
  return Api()
    .get(`/books/${idBook}`)
    .then(handleResponse)
    .then(book => {
      const chapters = arrToMap(book.chapters, "id_chapter", ChapterRecord);
      const chaptersToMap = { ...book, chapters };

      return chaptersToMap;
    });
}

function getChapterText(idBook, idChapter) {
  return Api()
    .get(`/books/${idBook}/${idChapter}`)
    .then(handleResponse)
    .then(data => data.chapter_content);
}
