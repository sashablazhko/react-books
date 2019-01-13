import React, { Component } from "react";
import classes from "./ChapterPage.module.css";
import { connect } from "react-redux";

import { moduleName, loadChapterText } from "../../../ducks/books";
import Loader from "../../UI/Loader/Loader";

class Chapter extends Component {
  componentDidMount() {
    const { chapter, loading, loadChapterText, match } = this.props;
    const loadBookInfo = !chapter;
    const loadChaptertext = !chapter || (!!chapter && !chapter.chapter_content);
    if (!loading && loadChaptertext) {
      loadChapterText(match.params.idBook, match.params.idChapter, loadBookInfo);
    }
  }

  render() {
    const { loading, chapter } = this.props;
    if (loading || !chapter) return <Loader />;
    const {
      chapter: { chapter_name, chapter_content },
    } = this.props;
    return (
      <div className={classes.ChapterPage}>
        <div className="container background">
          <p>{chapter_name}</p>
          <p dangerouslySetInnerHTML={{ __html: chapter_content }} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    chapter:
      state[moduleName].getIn([
        "entities",
        +ownProps.match.params.idBook,
        "chapters",
        +ownProps.match.params.idChapter,
      ]) &&
      state[moduleName]
        .getIn(["entities", +ownProps.match.params.idBook, "chapters", +ownProps.match.params.idChapter])
        .toJS(),
    loading: state[moduleName].loading,
  }),
  { loadChapterText }
)(Chapter);
