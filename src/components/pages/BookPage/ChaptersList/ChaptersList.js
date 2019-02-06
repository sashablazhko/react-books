import React from "react";
import classes from "./ChaptersList.module.css";
import { Link } from "react-router-dom";

import { mapToArr } from "../../../../helpers";

const ChaptersList = ({ chapters }) => {
  return (
    <ul className={classes.ChaptersList}>
      {mapToArr(chapters).map(chapter => {
        return (
          <li key={chapter.idChapter}>
            <Link to={`${chapter.bookId}/${chapter.idChapter}`}>{chapter.chapterName}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChaptersList;
