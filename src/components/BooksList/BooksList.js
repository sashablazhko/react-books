import React, { Component } from "react";
import classes from "./BooksList.module.css";
import { connect } from "react-redux";
import BookCard from "./BookCard/BookCard";
import Loader from "../UI/Loader/Loader";

import { loadAllBooks } from "../../actions";
import { mapToArr } from "../../helpers";

class BooksList extends Component {
  componentDidMount() {
    const { loadAllBooks, books } = this.props;
    if (books.size < 3) {
      loadAllBooks();
    }
  }

  render() {
    const { loadingBooks, loadingAuthors, books, authors } = this.props;
    if (loadingBooks || loadingAuthors) return <Loader />;
    return (
      <div className={classes.BooksList}>
        {mapToArr(books).map(book => {
          return <BookCard key={book.idBook} book={book} author={authors[book.authorId]} />;
        })}
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      books: state.books.entities,
      authors: state.authors.entities && state.authors.entities.toJS(),
      loadingBooks: state.books.loading,
      loadingAuthors: state.authors.loading,
    };
  },
  { loadAllBooks }
)(BooksList);
