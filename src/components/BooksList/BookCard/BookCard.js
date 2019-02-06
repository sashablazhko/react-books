import React from "react";
import classes from "./BookCard.module.css";
import { Link } from "react-router-dom";

const BookCard = ({ book: { idBook, bookImg, bookName, content }, author: { authorName } }) => {
  return (
    <div className={classes.BookCard}>
      <div className={classes.image}>
        <img src={`http://laravel-books/uploads/${bookImg}`} alt={`${bookName} Book Poster`} />
      </div>
      <div className={classes.content}>
        <h2>
          <Link to={`/book/${idBook}`}>{bookName}</Link>
        </h2>
        <p>{authorName}</p>
        {/* <p>{book_discription}</p> */}
        <p>category</p>
        <p>stars</p>
      </div>
    </div>
  );
};

export default BookCard;
