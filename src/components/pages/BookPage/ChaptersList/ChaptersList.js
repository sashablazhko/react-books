import React from "react";
import classes from "./ChaptersList.module.css";
import { Link } from "react-router-dom";

import { mapToArr } from "../../../../helpers";

const ChaptersList = ({ chapters }) => {
  return (
    <ul className={classes.ChaptersList}>
      {mapToArr(chapters).map(chapter => {
        return (
          <li key={chapter.id_chapter}>
            <Link to={`${chapter.book_id}/${chapter.id_chapter}`}>{chapter.chapter_name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChaptersList;
