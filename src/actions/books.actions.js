import { booksConstants } from "../constants/books.constants";

import { booksService } from "../services/BooksService";

export const booksActions = {
  loadAllBooks,
  // loadBook,
  // loadChapterText
};

export function loadAllBooks() {
  return dispatch => {
    dispatch(request());

    booksService.getBooks().then(
      books => {
        dispatch(success(books));
      },
      err => {
        console.log("LOAD ALL BOOKS ERR", err);
        dispatch(failure(err));
      }
    );
  };

  function request() {
    return { type: booksConstants.API_BOOKS_REQUEST };
  }
  function success(books) {
    return { type: booksConstants.LOAD_ALL_BOOKS_SUCCESS, books };
  }
  function failure(err) {
    return { type: booksConstants.API_BOOKS_FAILURE, err };
  }
}

// export function loadBook(id, withAurhorsList = false) {
//   return async (dispatch, getState) => {
//     if (withAurhorsList) {
//       dispatch(loadAllAuthors());
//     }
//     dispatch({
//       type: booksConstants.API_BOOKS_REQUEST,
//     });

//     try {
//       const res = await booksService.getBook(id);
//       const chapters = arrToMap(res.data.chapters, "id_chapter", ChapterRecord);
//       const book = { ...res.data, chapters };
//       dispatch({
//         type: booksConstants.LOAD_BOOK_SUCCESS,
//         payload: {
//           book,
//         },
//       });
//     } catch (err) {
//       console.log("LOAD BOOK ERR", err);
//       dispatch({
//         type: booksConstants.API_BOOKS_ERROR,
//         payload: {
//           errMsg: err,
//         },
//       });
//       // toast.error(err.response.data.error);
//     }
//   };
// }

// export function loadChapterText(idBook, idChapter, loadBookInfo) {
//   return async dispatch => {
//     dispatch({
//       type: booksConstants.API_BOOKS_REQUEST,
//     });

//     try {
//       if (loadBookInfo) {
//         dispatch(loadBook(idBook));
//       }
//       const res = await booksService.getChapterText(idBook, idChapter);
//       const { chapter_content } = res.data;
//       dispatch({
//         type: booksConstants.LOAD_CHAPTER_TEXT_SUCCESS,
//         payload: {
//           idBook,
//           idChapter,
//           chapter_content,
//         },
//       });
//     } catch (err) {
//       console.log("LOAD CHAPTER TEXT ERR", err);
//       dispatch({
//         type: booksConstants.API_BOOKS_ERROR,
//         payload: {
//           errMsg: err,
//         },
//       });
//     }
//   };
// }
