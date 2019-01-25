import { OrderedMap, Record } from "immutable";
import { booksService as Books } from "../services/BooksService";
import { arrToMap } from "../helpers";
import { toast } from "react-toastify";

import { loadAllAuthors } from "./authors";

const BookRecord = Record({
  id_book: null,
  book_name: null,
  author_id: null,
  author_name: null,
  book_img: null,
  book_description: null,
  chapters: new OrderedMap({}),
  updated_at: null,
});

const ChapterRecord = Record({
  id_chapter: null,
  chapter_number: null,
  chapter_name: null,
  chapter_content: null,
  book_id: null,
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
        .update("entities", entities => arrToMap(payload.books, "id_book", BookRecord).merge(entities));

    case LOAD_BOOK_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => arrToMap([payload.book], "id_book", BookRecord).merge(entities));

    case LOAD_CHAPTER_TEXT_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .setIn(["entities", payload.idBook, "chapters", payload.idChapter, "chapter_content"], payload.chapter_content);

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
          item.chapters = arrToMap(item.chapters, "id_chapter", ChapterRecord);
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
      const chapters = arrToMap(res.data.chapters, "id_chapter", ChapterRecord);
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
      const { chapter_content } = res.data;
      dispatch({
        type: LOAD_CHAPTER_TEXT_SUCCESS,
        payload: {
          idBook,
          idChapter,
          chapter_content,
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
