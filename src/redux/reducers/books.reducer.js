import { OrderedMap, Record } from "immutable";

import { booksConstants } from "../../constants/books.constants";
import { arrToMap } from "../../helpers";
import { adminConstants } from "../../constants/admin.constants";

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

export const ChapterRecord = Record({
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

export function books(state = new ReducerState(), action) {
  const { type } = action;

  switch (type) {
    case booksConstants.LOAD_ALL_BOOKS_REQUEST:
    case booksConstants.LOAD_BOOK_REQUEST:
    case booksConstants.LOAD_CHAPTER_TEXT_REQUEST:
    case adminConstants.ADD_BOOK_REQUEST:
    case adminConstants.UPDATE_BOOK_REQUEST:
    case adminConstants.ADD_CHAPTER_REQUEST:
    case adminConstants.UPDATE_CHAPTER_REQUEST:
      return state.set("loading", true);

    case booksConstants.LOAD_ALL_BOOKS_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => arrToMap(action.books, "idBook", BookRecord).merge(entities));

    case booksConstants.LOAD_BOOK_SUCCESS:
    case adminConstants.UPDATE_BOOK_SUCCESS:
    case adminConstants.ADD_BOOK_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .update("entities", entities => entities.merge(arrToMap([action.book], "idBook", BookRecord)));

    case booksConstants.LOAD_CHAPTER_TEXT_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .setIn(["entities", action.idBook, "chapters", action.idChapter, "chapterContent"], action.chapterContent);

    case adminConstants.ADD_CHAPTER_SUCCESS:
    case adminConstants.UPDATE_CHAPTER_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .updateIn(["entities", action.idBook, "chapters"], chapters =>
          chapters.merge(arrToMap([action.chapter], "idChapter", ChapterRecord))
        );

    case adminConstants.UPLOAD_BOOKIMG_SUCCESS:
    case adminConstants.DELETE_BOOKIMG_SUCCESS:
      return state.setIn(["entities", action.idBook, "bookImg"], action.imgName);
    // return state.updateIn(["entities", action.idBook], item => item.set("bookImg", action.imgName));

    case booksConstants.LOAD_ALL_BOOKS_FAILURE:
    case booksConstants.LOAD_BOOK_FAILURE:
    case booksConstants.LOAD_CHAPTER_TEXT_FAILURE:
    case adminConstants.ADD_BOOK_FAILURE:
    case adminConstants.UPDATE_BOOK_FAILURE:
    case adminConstants.ADD_CHAPTER_FAILURE:
    case adminConstants.UPDATE_CHAPTER_FAILURE:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", action.errMsg);

    default:
      return state;
  }
}
