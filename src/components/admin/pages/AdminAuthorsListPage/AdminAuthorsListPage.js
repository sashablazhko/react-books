import React, { Component } from "react";
import classes from "./AdminAuthorsListPage.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../UI/Loader/Loader";

import { moduleName, loadAllAuthors } from "../../../../ducks/authors.js";
import { mapToArr } from "../../../../helpers";

class AdminAuthorsListPage extends Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    const { loadAllAuthors, loading, listLoaded } = this.props;
    if (!loading && !listLoaded) {
      loadAllAuthors();
    }
  }

  handlerOnChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { loading, authors } = this.props;
    const { searchTerm } = this.state;
    if (loading) return <Loader />;
    return (
      <div>
        <button>Добавить автора</button>
        <hr />
        <input type="text" value={searchTerm} onChange={this.handlerOnChange} placeholder="Поиск" />
        <ul className={classes.AdminAuthorsListPage}>
          {mapToArr(authors)
            .filter(author => `${author.author_name}`.toUpperCase().indexOf(searchTerm.trim().toUpperCase()) >= 0)
            .map(author => {
              return (
                <li key={author.id_author}>
                  <Link to={`/admin/authors/${author.id_author}`}>{author.author_name}</Link>
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
    authors: state[moduleName].entities,
    loading: state[moduleName].loading,
    listLoaded: state[moduleName].listLoaded,
  }),
  { loadAllAuthors }
)(AdminAuthorsListPage);
