import React, { Component } from "react";
import classes from "./AdminBookPage.module.css";
import { connect } from "react-redux";

import {
  loadBook,
  loadAllAuthors,
  uploadBookImg,
  deleteBookImg,
  updateBook,
  uploadImgWithoutBook,
  addBook,
} from "../../../../actions";
import BookEdit from "./BookEdit/BookEdit";
import Loader from "../../../UI/Loader/Loader";
import { booksLoadingSelector, authorsLoadingSelector, bookSelector, authorsListSelector } from "../../../../selectors";

class AdminBookPage extends Component {
  state = {
    currentImg: "noimage.jpg",
  };

  componentDidMount() {
    const { book, booksLoading, loadBook, match, authorsLoading, authors, loadAllAuthors, create } = this.props;
    if (!authorsLoading && !authors.length && match.params.idAuthor !== "new" && !create) {
      loadBook(match.params.idBook, true);
    } else if (!booksLoading && !book && match.params.idAuthor !== "new" && !create) {
      loadBook(match.params.idBook);
    } else if (!authorsLoading && !authors.length) {
      loadAllAuthors();
    }
  }

  handleCreate = book => {
    this.props.addBook(book);
  };
  handleEdit = book => {
    this.props.updateBook(this.props.match.params.idBook, book);
  };
  handleDelete = () => {};
  handleUploadBookImg = file => this.props.uploadBookImg(file, +this.props.match.params.idBook);
  handleDeleteBookImg = () => this.props.deleteBookImg(+this.props.match.params.idBook);
  handleUploadImgWithoutBook = file =>
    uploadImgWithoutBook(file).then(imgName => this.setState({ currentImg: imgName }));
  handleDeleteImgWithoutBook = () => this.setState({ currentImg: "noimage.jpg" });

  editOrCreate = () => {
    const { create, book, booksLoading, authors, authorsLoading } = this.props;
    if (booksLoading || authorsLoading || !authors.length) {
      return <Loader />;
    } else if (create) {
      return (
        <BookEdit
          onSubmit={this.handleCreate}
          currentImg={this.state.currentImg}
          onUploadImg={this.handleUploadImgWithoutBook}
          onDeleteImg={this.handleDeleteImgWithoutBook}
          authors={authors}
          booksLoading={booksLoading}
          authorsLoading={authorsLoading}
        />
      );
    } else if (book) {
      return (
        <BookEdit
          onSubmit={this.handleEdit}
          currentImg={book.bookImg}
          onUploadImg={this.handleUploadBookImg}
          onDeleteImg={this.handleDeleteBookImg}
          book={book}
          authors={authors}
          booksLoading={booksLoading}
          authorsLoading={authorsLoading}
        />
      );
    }
  };

  render() {
    return <div className={classes.AdminBookPage}>{this.editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    booksLoading: booksLoadingSelector(state),
    authorsLoading: authorsLoadingSelector(state),
    book: bookSelector(state, ownProps),
    authors: authorsListSelector(state),
  }),
  { loadBook, loadAllAuthors, uploadBookImg, deleteBookImg, updateBook, addBook }
)(AdminBookPage);
