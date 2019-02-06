import { OrderedMap, Record } from "immutable";
import { booksService as Books } from "../services/BooksService";
import { arrToMap } from "../helpers";
import { toast } from "react-toastify";

import { loadAllAuthors } from "./authors";

const BookRecord = Record({
  idBook: null,
  bookName: null,
  authorId: null,
  authorName: null,
  bookImg: null,
  bookDescription: null,
  chapters: new OrderedMap({}),
  updatedAt: null,
});

const ChapterRecord = Record({
  idChapter: null,
  chapterNumber: null,
  chapterName: null,
  chapterContent: null,
  bookId: null,
});

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "books";
export const API_BOOKS_REQUEST = `${moduleName}/API_BOOKS_REQUEST`;
export const API_BOOKS_ERROR = `${moduleName}/API_BOOKS_ERROR`;
export const LOAD_ALL_BOOKS_SUCCESS = `${moduleName}/LOAD_ALL_BOOKS_SUCCESS`;
export const LOAD_BOOK_SUCCESS = `${moduleName}/LOAD_BOOK_SUCCESS`;
export const LOAD_CHAPTER_TEXT_SUCCESS = `${moduleName}/LOAD_CHAPTER_TEXT_SUCCESS`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case API_BOOKS_REQUEST:
      return state.set("loading", true);

    case LOAD_ALL_BOOKS_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => arrToMap(payload.books, "idBook", BookRecord).merge(entities));

    case LOAD_BOOK_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => arrToMap([payload.book], "idBook", BookRecord).merge(entities));

    case LOAD_CHAPTER_TEXT_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .setIn(["entities", payload.idBook, "chapters", payload.idChapter, "chapterContent"], payload.chapterContent);

    case API_BOOKS_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", payload.errMsg);

    default:
      return state;
  }
}

export function loadAllBooks() {
  return dispatch => {
    dispatch({
      type: API_BOOKS_REQUEST,
    });

    Books.getBooks().then(
      res => {
        const { data } = res;
        const books = data.map(item => {
          item.chapters = arrToMap(item.chapters, "idChapter", ChapterRecord);
          return item;
        });
        dispatch({
          type: LOAD_ALL_BOOKS_SUCCESS,
          payload: {
            books,
          },
        });
      },
      err => {
        console.log("LOAD ALL BOOKS ERR", err);
        dispatch({
          type: API_BOOKS_ERROR,
          payload: {
            errMsg: err.message,
          },
        });
        toast.error(err.message);
      }
    );
  };
}

export function loadBook(id, withAurhorsList = false) {
  return async (dispatch, getState) => {
    if (withAurhorsList) {
      dispatch(loadAllAuthors());
    }
    dispatch({
      type: API_BOOKS_REQUEST,
    });

    try {
      const res = await Books.getBook(id);
      const chapters = arrToMap(res.data.chapters, "idChapter", ChapterRecord);
      const book = { ...res.data, chapters };
      dispatch({
        type: LOAD_BOOK_SUCCESS,
        payload: {
          book,
        },
      });
    } catch (err) {
      console.log("LOAD BOOK ERR", err);
      dispatch({
        type: API_BOOKS_ERROR,
        payload: {
          errMsg: err,
        },
      });
      // toast.error(err.response.data.error);
    }
  };
}

export function loadChapterText(idBook, idChapter, loadBookInfo) {
  return async dispatch => {
    dispatch({
      type: API_BOOKS_REQUEST,
    });

    try {
      if (loadBookInfo) {
        dispatch(loadBook(idBook));
      }
      const res = await Books.getChapterText(idBook, idChapter);
      const { chapterContent } = res.data;
      dispatch({
        type: LOAD_CHAPTER_TEXT_SUCCESS,
        payload: {
          idBook,
          idChapter,
          chapterContent,
        },
      });
    } catch (err) {
      console.log("LOAD CHAPTER TEXT ERR", err);
      dispatch({
        type: API_BOOKS_ERROR,
        payload: {
          errMsg: err,
        },
      });
    }
  };
}
