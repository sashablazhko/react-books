import React, { Component } from "react";
import classes from "./ChapterPage.module.css";
import { connect } from "react-redux";

import { loadChapterText } from "../../../actions";
import Loader from "../../UI/Loader/Loader";

class Chapter extends Component {
  componentDidMount() {
    const { chapter, loading, loadChapterText, match } = this.props;
    const loadBookInfo = !chapter;
    const loadChaptertext = !chapter || (!!chapter && !chapter.chapterContent);
    if (!loading && loadChaptertext) {
      loadChapterText(match.params.idBook, match.params.idChapter, loadBookInfo);
    }
  }

  render() {
    const { loading, chapter } = this.props;
    if (loading || !chapter) return <Loader />;
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
    chapter:
      state.books.getIn(["entities", ownProps.match.params.idBook, "chapters", ownProps.match.params.idChapter]) &&
      state.books.getIn(["entities", ownProps.match.params.idBook, "chapters", ownProps.match.params.idChapter]).toJS(),
    loading: state.books.loading,
  }),
  { loadChapterText }
)(Chapter);
