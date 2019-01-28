import { OrderedMap, Record } from "immutable";

import { booksConstants } from "../../constants/books.constants";
import { arrToMap } from "../../helpers";

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

export const ChapterRecord = Record({
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

export function books(state = new ReducerState(), action) {
  const { type } = action;

  switch (type) {
    case booksConstants.API_BOOKS_REQUEST:
      return state.set("loading", true);

    case booksConstants.LOAD_ALL_BOOKS_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => arrToMap(action.books, "id_book", BookRecord).merge(entities));

    case booksConstants.LOAD_BOOK_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => arrToMap([action.book], "id_book", BookRecord).merge(entities));

    case booksConstants.LOAD_CHAPTER_TEXT_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .setIn(["entities", action.idBook, "chapters", action.idChapter, "chapter_content"], action.chapter_content);

    case booksConstants.API_BOOKS_FAILURE:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", action.errMsg);

    default:
      return state;
  }
}
