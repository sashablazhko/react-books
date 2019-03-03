import React, { Component } from "react";
import classes from "./AdminChapterPage.module.css";
import { connect } from "react-redux";

import ChapterEdit from "./ChapterEdit/ChapterEdit";
import { loadChapterText, updateChapter, addChapter } from "../../../../actions";
import Loader from "../../../UI/Loader/Loader";
import { booksLoadingSelector, chapterSelector } from "selectors";

class AdminChapterPage extends Component {
  componentDidMount() {
    const { chapter, booksLoading, loadChapterText, match } = this.props;
    const loadBookInfo = !chapter;
    const loadChaptertext = !chapter || (!!chapter && !chapter.chapterContent);
    if (!booksLoading && loadChaptertext && !!match.params.idChapter) {
      loadChapterText(+match.params.idBook, +match.params.idChapter, loadBookInfo);
    }
  }

  handleCreate = chapter => {
    this.props.addChapter(this.props.match.params.idBook, chapter);
  };
  handleEdit = chapter => {
    this.props.updateChapter(this.props.match.params.idChapter, chapter);
  };
  handleDelete = () => {};

  editOrCreate = () => {
    const { create, booksLoading, chapter } = this.props;
    if (booksLoading) {
      return <Loader />;
    } else if (create) {
      return <ChapterEdit onSubmit={this.handleCreate} booksLoading={booksLoading} />;
    } else if (chapter) {
      return <ChapterEdit onSubmit={this.handleEdit} chapter={chapter} booksLoading={booksLoading} />;
    }
  };

  render() {
    return <div className={classes.ChapterPage}>{this.editOrCreate()}</div>;
  }
}

export default connect(
  (state, ownProps) => ({
    chapter: chapterSelector(state, ownProps),
    booksLoading: booksLoadingSelector(state),
  }),
  { loadChapterText, updateChapter, addChapter }
)(AdminChapterPage);
