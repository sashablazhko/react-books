import React, { Component } from "react";
import classes from "./AdminAuthorPage.module.css";
import { connect } from "react-redux";

import { loadAuthor, updateAuthor, addAuthor } from "../../../../actions";
import AuthorEdit from "./AuthorEdit/AuthorEdit";
import Loader from "../../../UI/Loader/Loader";
import { authorsLoadingSelector, authorSelector } from "selectors";

class AdminAuthorPage extends Component {
  componentDidMount() {
    const { author, loading, loadAuthor, match } = this.props;
    if (!loading && !author && !!match.params.idAuthor) {
      loadAuthor(match.params.idAuthor);
    }
  }

  handleCreate = ({ authorName }) => {
    this.props.addAuthor(authorName);
  };
  handleEdit = ({ authorName }) => {
    this.props.updateAuthor(this.props.author.idAuthor, authorName);
  };
  handleDelete = () => {};

  editOrCreate = () => {
    const { create, author, loading } = this.props;
    if (loading) {
      return <Loader />;
    } else if (create) {
      return <AuthorEdit onSubmit={this.handleCreate} loading={loading} />;
    } else if (author) {
      return <AuthorEdit onSubmit={this.handleEdit} author={author} loading={loading} />;
    }
  };

  render() {
    return <div className={classes.AdminAuthorPage}>{this.editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    authorsLoading: authorsLoadingSelector(state),
    author: authorSelector(state, ownProps),
  }),
  { loadAuthor, updateAuthor, addAuthor }
)(AdminAuthorPage);
