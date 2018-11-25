import { OrderedMap, Record, List } from "immutable";
import Books from "../services/BooksService";
import { arrToMap } from "../helpers";

const BookRecord = Record({
  id_book: null,
  book_name: null,
  author_id: null,
  author_name: null,
  book_img: null,
  book_description: null,
  chapters: new List(),
  updated_at: null,
});

const ChapterRecord = Record({
  id_chapter: null,
  chapter_number: null,
  chapter_name: null,
  book_id: null,
});

const ReducerState = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "books";
export const LOAD_ALL_BOOKS_REQUEST = `${moduleName}/LOAD_ALL_BOOKS_REQUEST`;
export const LOAD_ALL_BOOKS_SUCCESS = `${moduleName}/LOAD_ALL_BOOKS_SUCCESS`;
export const LOAD_ALL_BOOKS_ERROR = `${moduleName}/LOAD_ALL_BOOKS_ERROR`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_BOOKS_REQUEST:
      return state.set("loading", true);

    case LOAD_ALL_BOOKS_SUCCESS:
      let beforeMap = payload.books.map(item => {
        item.chapters = arrToMap(item.chapters, "id_chapter", ChapterRecord);
        return item;
      });
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("error", null)
        .update("entities", entities => arrToMap(beforeMap, "id_book", BookRecord).merge(entities));

    default:
      return state;
  }
}

export function loadAllBooks() {
  return dispatch => {
    dispatch({
      type: LOAD_ALL_BOOKS_REQUEST,
    });

    Books.getBooks().then(
      res => {
        const { data } = res;
        dispatch({
          type: LOAD_ALL_BOOKS_SUCCESS,
          payload: {
            books: data,
          },
        });
      },
      err => {
        console.log("LOAD ALL BOOKS ERR", err);
        dispatch({
          type: LOAD_ALL_BOOKS_ERROR,
          err,
        });
      }
    );
  };
}
