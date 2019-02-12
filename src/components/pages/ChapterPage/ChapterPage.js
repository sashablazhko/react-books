import React, { Component } from "react";
import classes from "./ChapterPage.module.css";
import { connect } from "react-redux";

import { loadChapterText } from "../../../actions";
import Loader from "../../UI/Loader/Loader";
import { booksLoadingSelector, chapterSelector } from "selectors";

class Chapter extends Component {
  componentDidMount() {
    const { chapter, booksLoading, loadChapterText, match } = this.props;
    const loadBookInfo = !chapter;
    const loadChaptertext = !chapter || (!!chapter && !chapter.chapterContent);
    if (!booksLoading && loadChaptertext) {
      loadChapterText(+match.params.idBook, +match.params.idChapter, loadBookInfo);
    }
  }

  render() {
    const { booksLoading, chapter } = this.props;
    if (booksLoading || !chapter) return <Loader />;
    const {
      chapter: { chapterName, chapterContent },
    } = this.props;
    return (
      <div className={classes.ChapterPage}>
        <div className="container background">
          <p>{chapterName}</p>
          <p dangerouslySetInnerHTML={{ __html: chapterContent }} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    chapter: chapterSelector(state, ownProps),
    booksLoading: booksLoadingSelector(state),
  }),
  { loadChapterText }
)(Chapter);
