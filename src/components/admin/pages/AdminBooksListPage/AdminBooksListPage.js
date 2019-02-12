import React, { Component } from "react";
import classes from "./AdminBooksListPage.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../UI/Loader/Loader";

import { loadAllBooks } from "../../../../actions";
import { booksListSelector, booksLoadingSelector } from "selectors";

class AdminBooksListPage extends Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    const { loadAllBooks, books } = this.props;
    console.log("books", books);
    if (books.length <= 1) {
      loadAllBooks();
    }
  }

  handlerOnChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { booksLoading, books } = this.props;
    const { searchTerm } = this.state;
    if (booksLoading) return <Loader />;
    return (
      <div>
        <button>Добавить книгу</button>
        <hr />
        <input type="text" value={searchTerm} onChange={this.handlerOnChange} placeholder="Поиск" />
        <ul className={classes.AdminBooksListPage}>
          {books
            .filter(book => `${book.bookName}`.toUpperCase().indexOf(searchTerm.trim().toUpperCase()) >= 0)
            .map(book => {
              return (
                <li key={book.idBook}>
                  <Link to={`/admin/books/${book.idBook}`}>{book.bookName}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    books: booksListSelector(state),
    booksLoading: booksLoadingSelector(state),
  }),
  { loadAllBooks }
)(AdminBooksListPage);
