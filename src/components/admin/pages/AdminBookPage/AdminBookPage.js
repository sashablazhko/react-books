import React, { Component } from "react";
import classes from "./AdminBookPage.module.css";
import { connect } from "react-redux";

import { loadBook, loadAllAuthors, uploadBookImg, deleteBookImg } from "../../../../actions";
import BookEdit from "./BookEdit/BookEdit";
import Loader from "../../../UI/Loader/Loader";
import { booksLoadingSelector, authorsLoadingSelector, bookSelector, authorsListSelector } from "../../../../selectors";

class AdminBookPage extends Component {
  componentDidMount() {
    const { book, booksLoading, loadBook, match, authorsLoading, authors } = this.props;
    if (!authorsLoading && !authors.size) {
      loadBook(match.params.idBook, true);
    } else if (!booksLoading && !book) {
      loadBook(match.params.idBook);
    }
  }

  handleCreate = () => {};
  handleEdit = args => {
    console.log("args", args);
  };
  handleDelete = () => {};
  handleUploadBookImg = file => this.props.uploadBookImg(file, this.props.match.params.idBook);
  handleDeleteBookImg = () => this.props.deleteBookImg(this.props.match.params.idBook);

  render() {
    const { create, book, booksLoading, authors, authorsLoading } = this.props;

    const editOrCreate = () => {
      if (create) {
        return (
          <BookEdit
            onSubmit={this.handleCreate}
            onUploadImg={this.handleUploadBookImg}
            onDeleteImg={this.handleDeleteBookImg}
            booksLoading={booksLoading}
            authorsLoading={authorsLoading}
          />
        );
      } else if (book) {
        return (
          <BookEdit
            onSubmit={this.handleEdit}
            onUploadImg={this.handleUploadBookImg}
            onDeleteImg={this.handleDeleteBookImg}
            book={book}
            authors={authors}
            booksLoading={booksLoading}
            authorsLoading={authorsLoading}
          />
        );
      } else if (booksLoading || authorsLoading) {
        return <Loader />;
      }
    };
    return <div className={classes.AdminBookPage}>{editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    booksLoading: booksLoadingSelector(state),
    authorsLoading: authorsLoadingSelector(state),
    book: bookSelector(state, ownProps),
    authors: authorsListSelector(state),
  }),
  { loadBook, loadAllAuthors, uploadBookImg, deleteBookImg }
)(AdminBookPage);
