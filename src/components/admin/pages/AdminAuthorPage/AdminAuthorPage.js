import React, { Component } from "react";
import classes from "./AdminAuthorPage.module.css";
import { connect } from "react-redux";

import { loadAuthor, updateAuthor } from "../../../../actions";
import AuthorEdit from "./AuthorEdit/AuthorEdit";
import Loader from "../../../UI/Loader/Loader";
import { authorsLoadingSelector, authorSelector } from "selectors";

class AdminAuthorPage extends Component {
  componentDidMount() {
    const { author, loading, loadAuthor, match } = this.props;
    if (!loading && !author) {
      loadAuthor(match.params.idAuthor);
    }
  }

  handleCreate = () => {};
  handleEdit = ({ authorName }) => {
    this.props.updateAuthor(this.props.author.idAuthor, authorName);
  };
  handleDelete = () => {};

  render() {
    const { create, author, loading } = this.props;

    const editOrCreate = () => {
      if (create) {
        return <AuthorEdit onSubmit={this.handleCreate} loading={loading} />;
      } else if (author) {
        return <AuthorEdit onSubmit={this.handleEdit} author={author} loading={loading} />;
      } else if (loading) {
        return <Loader />;
      }
    };
    return <div className={classes.AdminAuthorPage}>{editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    authorsLoading: authorsLoadingSelector(state),
    author: authorSelector(state, ownProps),
  }),
  { loadAuthor, updateAuthor }
)(AdminAuthorPage);
