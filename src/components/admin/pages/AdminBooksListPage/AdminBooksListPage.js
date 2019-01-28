import React, { Component } from "react";
import classes from "./AdminBooksListPage.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../UI/Loader/Loader";

import { loadAllBooks } from "../../../../actions";
import { mapToArr } from "../../../../helpers";

class AdminBooksListPage extends Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    const { loadAllBooks, books } = this.props;
    if (books.size <= 1) {
      loadAllBooks();
    }
  }

  handlerOnChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { loading, books } = this.props;
    const { searchTerm } = this.state;
    if (loading) return <Loader />;
    return (
      <div>
        <button>Добавить книгу</button>
        <hr />
        <input type="text" value={searchTerm} onChange={this.handlerOnChange} placeholder="Поиск" />
        <ul className={classes.AdminBooksListPage}>
          {mapToArr(books)
            .filter(book => `${book.book_name}`.toUpperCase().indexOf(searchTerm.trim().toUpperCase()) >= 0)
            .map(book => {
              return (
                <li key={book.id_book}>
                  <Link to={`/admin/books/${book.id_book}`}>{book.book_name}</Link>
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
    books: state.books.entities,
    loading: state.books.loading,
  }),
  { loadAllBooks }
)(AdminBooksListPage);
