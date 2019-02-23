import React, { Component } from "react";
import classes from "./BookPage.module.css";
import { connect } from "react-redux";

import bg from "../../../resources/images/bg.jpg";
import { loadBook } from "../../../actions";
import Loader from "../../UI/Loader/Loader";
import ChaptersList from "./ChaptersList/ChaptersList";
import { bookSelector, booksLoadingSelector, authorsMapSelector } from "selectors";

class BookPage extends Component {
  componentDidMount() {
    const { book, booksLoading, loadBook, match } = this.props;
    if (!booksLoading && !book) {
      loadBook(match.params.idBook, true);
    }
  }

  render() {
    const { booksLoading, book } = this.props;
    if (booksLoading || !book) return <Loader />;
    const {
      book: { bookName, bookDescription, chapters, authorName },
    } = this.props;
    return (
      <div className={classes.BookPage} style={{ background: `url(${bg})` }}>
        <div className="container background">
          <h1>{bookName}</h1>
          <h3>Главы:</h3>
          <ChaptersList chapters={chapters} />
          <p>Автор: {authorName}</p>
          <h4>О книге:</h4>
          <p>{bookDescription}</p>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    book: bookSelector(state, ownProps),
    booksLoading: booksLoadingSelector(state),
  }),
  { loadBook }
)(BookPage);
