import React, { Component } from "react";
import classes from "./BooksList.module.css";
import { connect } from "react-redux";
import BookCard from "./BookCard/BookCard";
import Loader from "../UI/Loader/Loader";

import { loadAllBooks } from "../../actions";
import { booksListSelector, booksLoadingSelector, authorsLoadingSelector, authorsMapSelector } from "selectors";

class BooksList extends Component {
  componentDidMount() {
    const { loadAllBooks, books } = this.props;
    if (books.length <= 3) {
      loadAllBooks();
    }
  }

  render() {
    const { booksLoading, authorsLoading, books, authors } = this.props;
    if (booksLoading || authorsLoading || !books.length || Object.keys(authors).length === 0) return <Loader />;
    return (
      <div className={classes.BooksList}>
        {books.map(book => {
          return <BookCard key={book.idBook} book={book} author={authors[book.authorId]} />;
        })}
      </div>
    );
  }
}

export default connect(
  state => ({
    books: booksListSelector(state),
    authors: authorsMapSelector(state) && authorsMapSelector(state).toJS(),
    booksLoading: booksLoadingSelector(state),
    authorsLoading: authorsLoadingSelector(state),
  }),
  { loadAllBooks }
)(BooksList);
