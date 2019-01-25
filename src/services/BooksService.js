import Api from "./Api";
import { arrToMap } from "../helpers";
import { ChapterRecord } from "../redux/reducers/books.reducer";

export const booksService = {
  getBooks,
  getBook,
  getChapterText,
};

function getBooks() {
  return Api()
    .get("/books1")
    .then(handleResponse)
    .then(books => {
      const booksToMap = books.map(item => {
        item.chapters = arrToMap(item.chapters, "id_chapter", ChapterRecord);
        return item;
      });
      return booksToMap;
    });
}

function getBook(bookId) {
  return Api().get(`/books/${bookId}`);
}

function getChapterText(bookId, chapterId) {
  return Api().get(`/books/${bookId}/${chapterId}`);
}

function handleResponse(res) {
  // console.log("res", res);
  const { data } = res;
  if (res.statusText !== "OK") {
    if (res.status === 401) {
      // auto logout if 401 response returned from api
      console.log("TODO LOGOUT");
    }

    const err = (data && data.message) || res.statusText;
    return Promise.reject(err);
  }

  return data;
}
