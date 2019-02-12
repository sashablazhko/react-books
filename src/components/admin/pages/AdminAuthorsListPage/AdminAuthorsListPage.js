import React, { Component } from "react";
import classes from "./AdminAuthorsListPage.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../UI/Loader/Loader";

import { loadAllAuthors } from "../../../../actions";
import { authorsListSelector, authorsLoadingSelector, authorsListLoadedSelector } from "selectors";

class AdminAuthorsListPage extends Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    const { loadAllAuthors, authorsLoading, authorsListLoaded } = this.props;
    if (!authorsLoading && !authorsListLoaded) {
      loadAllAuthors();
    }
  }

  handlerOnChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { authorsLoading, authors } = this.props;
    const { searchTerm } = this.state;
    if (authorsLoading) return <Loader />;
    return (
      <div>
        <button>Добавить автора</button>
        <hr />
        <input type="text" value={searchTerm} onChange={this.handlerOnChange} placeholder="Поиск" />
        <ul className={classes.AdminAuthorsListPage}>
          {authors
            .filter(author => `${author.authorName}`.toUpperCase().indexOf(searchTerm.trim().toUpperCase()) >= 0)
            .map(author => {
              return (
                <li key={author.idAuthor}>
                  <Link to={`/admin/authors/${author.idAuthor}`}>{author.authorName}</Link>
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
    authors: authorsListSelector(state),
    authorsLoading: authorsLoadingSelector(state),
    authorsListLoaded: authorsListLoadedSelector(state),
  }),
  { loadAllAuthors }
)(AdminAuthorsListPage);
