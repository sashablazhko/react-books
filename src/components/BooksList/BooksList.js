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
    const { loading, books } = this.props;
    if (loading) return <Loader />;
    return (
      <div className={classes.BooksList}>
        {mapToArr(books).map(book => {
          return <BookCard key={book.id_book} book={book} />;
        })}
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      books: state.books.entities,
      loading: state.books.loading,
    };
  },
  { loadAllBooks }
)(BooksList);
