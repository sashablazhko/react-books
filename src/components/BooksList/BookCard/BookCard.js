import React from "react";
import classes from "./BookCard.module.css";
import { Link } from "react-router-dom";

const BookCard = ({ book: { id_book, book_img, book_name, content, author_name } }) => {
  return (
    <div className={classes.BookCard}>
      <div className={classes.image}>
        <img src={`http://laravel-books/uploads/${book_img}`} alt={`${book_name} Book Poster`} />
      </div>
      <div className={classes.content}>
        <h2>
          <Link to={`./book/${id_book}`}>{book_name}</Link>
        </h2>
        <p>{author_name}</p>
        {/* <p>{book_discription}</p> */}
        <p>category</p>
        <p>stars</p>
      </div>
    </div>
  );
};

export default BookCard;
