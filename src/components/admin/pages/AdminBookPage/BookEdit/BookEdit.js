import React from "react";
import classes from "./BookEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

const BookEdit = ({ book, onSubmit }) => {
  let initData = undefined;
  if (book) {
    initData = {
      book_name: book.book_name,
      author_name: book.author_name,
      book_img: book.book_img,
      book_description: book.book_description,
    };
    console.log("initData", initData);
  }
  return (
    <div className={classes.BookEdit}>
      <Form initialValues={initData} onSubmit={onSubmit}>
        {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="book_name" placeholder="Название книги">
              {({ input, meta, placeholder }) => (
                <div>
                  <label>Название книги</label>
                  <input {...input} placeholder={placeholder} />
                </div>
              )}
            </Field>
            <button type="submit">Сохранить</button>
          </form>
        )}
      </Form>
      <pre>{JSON.stringify(book, null, 4)}</pre>
    </div>
  );
};

export default BookEdit;
