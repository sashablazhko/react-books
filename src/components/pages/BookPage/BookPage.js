import React, { Component } from "react";
import classes from "./BookPage.module.css";
import { connect } from "react-redux";

import bg from "../../../resources/images/bg.jpg";
import { loadBook } from "../../../actions";
import Loader from "../../UI/Loader/Loader";
import ChaptersList from "./ChaptersList/ChaptersList";

class BookPage extends Component {
  componentDidMount() {
    const { book, loading, loadBook, match } = this.props;
    if (!loading && !book) {
      loadBook(match.params.idBook);
    }
  }

  render() {
    const { loading, book } = this.props;
    if (loading || !book) return <Loader />;
    const {
      chapters,
      book: { book_name, author_name, book_description },
    } = this.props;
    return (
      <div className={classes.BookPage} style={{ background: `url(${bg})` }}>
        <div className="container background">
          <h1>{book_name}</h1>
          <h3>Главы:</h3>
          <ChaptersList chapters={chapters} />
          <p>Автор: {author_name}</p>
          <h4>О книге:</h4>
          <p>{book_description}</p>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    book:
      state.books.entities.get(ownProps.match.params.idBook) &&
      state.books.entities.get(ownProps.match.params.idBook).toJS(),
    chapters:
      state.books.entities.get(ownProps.match.params.idBook) &&
      state.books.entities.get(ownProps.match.params.idBook).chapters,
    loading: state.books.loading,
  }),
  { loadBook }
)(BookPage);
