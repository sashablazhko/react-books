import React from "react";
import { connect } from "react-redux";
import BookCard from "./BookCard/BookCard";
import Loader from "../UI/Loader/Loader";

import { moduleName } from "../../ducks/books.js";

const BooksList = props => {
  if (props.loading) return <Loader />;
  return (
    <div>
      {props.books
        .valueSeq()
        .toArray()
        .map(book => {
          return <BookCard key={book.id_book} book={book} />;
        })}
    </div>
  );
};

export default connect(state => ({
  books: state[moduleName].entities,
  loading: state[moduleName].loading,
  loaded: state[moduleName].loaded,
}))(BooksList);
