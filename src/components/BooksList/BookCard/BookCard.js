import React from "react";

const BookCard = props => {
  return (
    <div>
      BookCard
      <img src={`http://laravel-books/uploads/${props.book.book_img}`} alt={`${props.book.book_name} Book Poster`} />
      <p>{props.book.book_name}</p>
      <p>{props.book.author_name}</p>
      <p>{props.book.book_discription}</p>
      <p>category</p>
      <p>stars</p>
    </div>
  );
};

export default BookCard;
