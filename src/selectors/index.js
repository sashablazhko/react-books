import { createSelector } from "reselect";
import { update } from "immutable";

export const idBookSelector = (_, props) => +props.match.params.idBook;

export const idAuthorSelector = (_, props) => +props.match.params.idAuthor;

export const idChapterSelector = (_, props) => +props.match.params.idChapter;

// AUTH
export const authLoadingSelector = state => state.auth.loading;

export const redirectToReferrerSelector = state => state.auth.redirectToReferrer;

export const expirationDateSelector = state => state.auth.user.expirationDate;

export const isAuthorizedSelector = createSelector(
  expirationDateSelector,
  expirationDate => {
    return parseInt(Date.now() / 1000, 10) < expirationDate;
  }
);

// AUTHORS
export const authorsMapSelector = state => state.authors.entities;
export const authorsListSelector = createSelector(
  authorsMapSelector,
  authorsMap => authorsMap.valueSeq().toArray()
);

export const authorsLoadingSelector = state => state.authors.loading;

export const authorsListLoadedSelector = state => state.authors.loadedList;

export const authorSelector = createSelector(
  authorsMapSelector,
  idAuthorSelector,
  (authors, idAurhor) => authors.get(idAurhor)
);

// BOOKS
export const booksMapSelector = state => state.books.entities;
export const booksListSelector = createSelector(
  booksMapSelector,
  booksMap => booksMap.valueSeq().toArray()
);

export const booksLoadingSelector = state => state.books.loading;

export const bookSelector = createSelector(
  booksMapSelector,
  idBookSelector,
  authorsMapSelector,
  (books, idBook, authors) =>
    books.get(idBook) &&
    books.get(idBook).set("authorName", authors.getIn([books.get(idBook).get("authorId"), "authorName"]))
);

export const chapterSelector = createSelector(
  booksMapSelector,
  idBookSelector,
  idChapterSelector,
  (books, idBook, idChapter) => {
    return books.getIn([idBook, "chapters", idChapter]);
  }
);
