import React, { Component } from "react";
import classes from "./AdminBookPage.module.css";
import { connect } from "react-redux";

import { moduleName, loadBook } from "../../../../ducks/books";
import BookEdit from "./BookEdit/BookEdit";
import Loader from "../../../UI/Loader/Loader";

class AdminBookPage extends Component {
  componentDidMount() {
    const { book, loading, loadBook, match } = this.props;
    if (!loading && !book) {
      loadBook(match.params.idBook);
    }
  }

  handleCreate = () => {};
  handleEdit = () => {
    console.log("handleEdit");
  };
  handleDelete = () => {};

  render() {
    const { create, book, loading } = this.props;

    const editOrCreate = () => {
      if (create) {
        return <BookEdit onSubmit={this.handleCreate} loading={loading} />;
      } else if (book) {
        return <BookEdit onSubmit={this.handleEdit} book={book} loading={loading} />;
      } else if (loading) {
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
    loading: state[moduleName].loading,
    book: state[moduleName].entities.get(+ownProps.match.params.idBook),
  }),
  { loadBook }
)(AdminBookPage);
