import React, { Component } from "react";
import classes from "./AdminBookPage.module.css";
import { connect } from "react-redux";

import { loadBook, loadAllAuthors, uploadBookImg, deleteBookImg, updateBook } from "../../../../actions";
import { uploadImgWithoutBook } from "../../../../actions/admin.actions";
import BookEdit from "./BookEdit/BookEdit";
import Loader from "../../../UI/Loader/Loader";
import { booksLoadingSelector, authorsLoadingSelector, bookSelector, authorsListSelector } from "../../../../selectors";

class AdminBookPage extends Component {
  state = {
    newBookImg: "noimage.jpg",
  };

  componentDidMount() {
    const { book, booksLoading, loadBook, match, authorsLoading, authors, loadAllAuthors } = this.props;
    if (!authorsLoading && !authors.length && match.params.idAuthor !== "new") {
      loadBook(match.params.idBook, true);
    } else if (!booksLoading && !book && match.params.idAuthor !== "new") {
      loadBook(match.params.idBook);
    } else if (!authorsLoading && !authors.length) {
      loadAllAuthors();
    }
  }

  handleCreate = args => {
    console.log("args", args);
  };
  handleEdit = book => {
    this.props.updateBook(this.props.match.params.idBook, book);
  };
  handleDelete = () => {};
  handleUploadBookImg = file => this.props.uploadBookImg(file, +this.props.match.params.idBook);
  handleDeleteBookImg = () => this.props.deleteBookImg(+this.props.match.params.idBook);
  handleUploadImgWithoutBook = file =>
    uploadImgWithoutBook(file).then(imgName => this.setState({ newBookImg: imgName }));
  handleDeleteImgWithoutBook = () => this.setState({ newBookImg: "noimage.jpg" });

  editOrCreate = () => {
    const { create, book, booksLoading, authors, authorsLoading } = this.props;
    if (booksLoading || authorsLoading || !authors.length) {
      return <Loader />;
    } else if (create) {
      return (
        <BookEdit
          onSubmit={this.handleCreate}
          onUploadImg={this.handleUploadImgWithoutBook}
          onDeleteImg={this.handleDeleteImgWithoutBook}
          newBookImg={this.state.newBookImg}
          authors={authors}
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
  { loadBook, loadAllAuthors, uploadBookImg, deleteBookImg, updateBook }
)(AdminBookPage);
