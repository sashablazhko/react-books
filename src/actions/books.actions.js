import { toast } from "react-toastify";
import { booksConstants } from "../constants/books.constants";
import { booksService } from "../services/BooksService";
import { loadAllAuthors } from "./authors.actions";

export function loadAllBooks() {
  return dispatch => {
    dispatch(_request());

    booksService.getBooks().then(
      books => {
        dispatch(_success(books));
      },
      err => {
        dispatch(_failure(err.toString()));
        toast.error(err.toString());
      }
    );
  };

  function _success(books) {
    return { type: booksConstants.LOAD_ALL_BOOKS_SUCCESS, books };
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
        dispatch(_failure(err.toString()));
        toast.error(err.toString());
      }
    );
  };

  function _success(book) {
    return { type: booksConstants.LOAD_BOOK_SUCCESS, book };
  }
}

export function loadChapterText(idBook, idChapter, loadBookInfo) {
  return dispatch => {
    dispatch(_request());

    if (loadBookInfo) {
      dispatch(loadBook(idBook));
    }
    booksService.getChapterText(idBook, idChapter).then(
      chapter_content => {
        dispatch(_success(idBook, idChapter, chapter_content));
      },
      err => {
        dispatch(_failure(err.toString()));
        toast.error(err.toString());
      }
    );
  };

  function _success(idBook, idChapter, chapter_content) {
    return { type: booksConstants.LOAD_CHAPTER_TEXT_SUCCESS, idBook, idChapter, chapter_content };
  }
}

function _request() {
  return { type: booksConstants.API_BOOKS_REQUEST };
}
function _failure(errMsg) {
  return { type: booksConstants.API_BOOKS_FAILURE, errMsg };
}
