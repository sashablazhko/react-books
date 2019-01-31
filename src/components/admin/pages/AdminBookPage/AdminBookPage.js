import React, { Component } from "react";
import classes from "./AdminBookPage.module.css";
import { connect } from "react-redux";

import { loadBook, loadAllAuthors, uploadBookImg } from "../../../../actions";
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
  handleUploadBookImg = file => this.props.uploadBookImg(file, this.props.match.params.idBook);

  render() {
    const { create, book, loadingBook, authors, loadingAuthors } = this.props;

    const editOrCreate = () => {
      if (create) {
        return (
          <BookEdit
            onSubmit={this.handleCreate}
            onUploadImg={this.handleUploadBookImg}
            loadingBook={loadingBook}
            loadingAuthors={loadingAuthors}
          />
        );
      } else if (book) {
        return (
          <BookEdit
            onSubmit={this.handleEdit}
            onUploadImg={this.handleUploadBookImg}
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
    loadingBook: state.books.loading,
    loadingAuthors: state.authors.loading,
    book: state.books.entities.get(ownProps.match.params.idBook),
    authors: state.authors.entities,
  }),
  { loadBook, loadAllAuthors, uploadBookImg }
)(AdminBookPage);
