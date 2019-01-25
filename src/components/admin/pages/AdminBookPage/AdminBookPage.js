import React, { Component } from "react";
import classes from "./AdminBookPage.module.css";
import { connect } from "react-redux";

import { moduleName as moduleBooks, loadBook } from "../../../../ducks/books";
import { moduleName as moduleAuthors, loadAllAuthors } from "../../../../ducks/authors";
import BookEdit from "./BookEdit/BookEdit";
import Loader from "../../../UI/Loader/Loader";

class AdminBookPage extends Component {
  componentDidMount() {
    const { book, loadingBook, loadBook, match, loadingAuthors, authors } = this.props;
    if (!loadingAuthors && !authors.size) {
      loadBook(match.params.idBook, true);
    } else if (!loadingBook && !book) {
      loadBook(match.params.idBook);
    }
  }

  handleCreate = () => {};
  handleEdit = args => {
    console.log("args", args);
  };
  handleDelete = () => {};

  render() {
    const { create, book, loadingBook, authors, loadingAuthors } = this.props;

    const editOrCreate = () => {
      if (create) {
        return <BookEdit onSubmit={this.handleCreate} loadingBook={loadingBook} loadingAuthors={loadingAuthors} />;
      } else if (book) {
        return (
          <BookEdit
            onSubmit={this.handleEdit}
            book={book}
            authors={authors}
            loadingBook={loadingBook}
            loadingAuthors={loadingAuthors}
          />
        );
      } else if (loadingBook || loadingAuthors) {
        return <Loader />;
      } else {
        return null;
      }
    };
    return <div className={classes.AdminBookPage}>{editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    loadingBook: state[moduleBooks].loading,
    loadingAuthors: state[moduleAuthors].loading,
    book: state[moduleBooks].entities.get(ownProps.match.params.idBook),
    authors: state[moduleAuthors].entities,
  }),
  { loadBook, loadAllAuthors }
)(AdminBookPage);
