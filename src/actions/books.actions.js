import { toast } from "react-toastify";
import { booksConstants } from "../constants/books.constants";
import { booksService } from "../services/BooksService";
import { loadAllAuthors } from "./authors.actions";

export function loadAllBooks() {
  return dispatch => {
    dispatch(_request());
    dispatch(loadAllAuthors());

    booksService.getBooks().then(
      books => {
        dispatch(_success(books));
      },
      err => {
        dispatch(_failure(err));
      }
    );
  };

  function _success(books) {
    return { type: booksConstants.LOAD_ALL_BOOKS_SUCCESS, books };
  }
  function _request() {
    return { type: booksConstants.LOAD_ALL_BOOKS_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: booksConstants.LOAD_ALL_BOOKS_FAILURE, errMsg };
  }
}

export function loadBook(id, withAurhorsList = false) {
  return (dispatch, getState) => {
    if (withAurhorsList) {
      dispatch(loadAllAuthors());
    }
    dispatch(_request());

    booksService.getBook(id).then(
      book => {
        dispatch(_success(book));
      },
      err => {
        dispatch(_failure(err));
      }
    );
  };

  function _success(book) {
    return { type: booksConstants.LOAD_BOOK_SUCCESS, book };
  }
  function _request() {
    return { type: booksConstants.LOAD_BOOK_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    return { type: booksConstants.LOAD_BOOK_FAILURE, errMsg };
  }
}

export function loadChapterText(idBook, idChapter, loadBookInfo) {
  return dispatch => {
    dispatch(_request());

    if (loadBookInfo) {
      dispatch(loadBook(idBook));
    }
    booksService.getChapterText(idBook, idChapter).then(
      chapterContent => {
        dispatch(_success(idBook, idChapter, chapterContent));
      },
      err => {
        dispatch(_failure(err));
      }
    );
  };

  function _success(idBook, idChapter, chapterContent) {
    return { type: booksConstants.LOAD_CHAPTER_TEXT_SUCCESS, idBook, idChapter, chapterContent };
  }
  function _request() {
    return { type: booksConstants.LOAD_CHAPTER_TEXT_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: booksConstants.LOAD_CHAPTER_TEXT_FAILURE, errMsg };
  }
}
