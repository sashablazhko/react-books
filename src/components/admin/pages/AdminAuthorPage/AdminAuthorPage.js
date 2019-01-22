import React, { Component } from "react";
import classes from "./AdminAuthorPage.module.css";
import { connect } from "react-redux";

import { moduleName, loadAuthor, updateAuthor } from "../../../../ducks/authors";
import AuthorEdit from "./AuthorEdit/AuthorEdit";
import Loader from "../../../UI/Loader/Loader";

class AdminAuthorPage extends Component {
  componentDidMount() {
    const { author, loading, loadAuthor, match } = this.props;
    if (!loading && !author) {
      loadAuthor(match.params.idAuthor);
    }
  }

  handleCreate = () => {};
  handleEdit = ({ author_name }) => {
    this.props.updateAuthor(this.props.author.id_author, author_name);
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
      } else {
        return null;
      }
    };
    return <div className={classes.AdminAuthorPage}>{editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    loading: state[moduleName].loading,
    author: state[moduleName].entities.get(+ownProps.match.params.idAuthor),
  }),
  { loadAuthor, updateAuthor }
)(AdminAuthorPage);
