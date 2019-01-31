import React, { Component } from "react";
import classes from "./BookEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import { apiHost } from "../../../../../config";
import Loader from "../../../../UI/Loader/Loader";
import { mapToArr } from "../../../../../helpers";

class BookEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_name: this.props.book.book_name,
      author_id: this.props.book.author_id,
      book_img: this.props.book.book_img,
      book_description: this.props.book.book_description,
    };
    this.formRef = React.createRef();
    this.bookImgRef = React.createRef();
    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleUploadImg(e) {
    e.preventDefault();
    const file = this.bookImgRef.current.files[0];
    if (file) {
      this.props.onUploadImg(file);
    }
  }

  handleCancel() {
    this.formRef.current.form.reset();
  }

  render() {
    const { book, onSubmit, loadingBook, authors, loadingAuthors } = this.props;
    return (
      <div className={classes.BookEdit}>
        <h2>{!book ? "Новая книга" : "Редактировать книгу"}</h2>
        <Form initialValues={this.state} onSubmit={onSubmit} ref={this.formRef}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="book_name" placeholder="Название книги">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>{placeholder}</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="author_id" placeholder="Автор" component="select">
                {({ input, meta, placeholder }) => {
                  return (
                    <div className="row">
                      <label>{placeholder}</label>
                      <select value={input.value} {...input}>
                        {mapToArr(authors).map(author => {
                          return (
                            <option value={author.id_author} key={author.id_author}>
                              {author.author_name}
                            </option>
                          );
                        })}
                      </select>
                      {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                    </div>
                  );
                }}
              </Field>

              <div className="row">
                <label>Обложка</label>
                <img src={`${apiHost}/uploads/${book.book_img}`} alt={book.book_name} />
                <p>{`${apiHost}/uploads/${book.book_img}`}</p>
                <input type="file" name="bookImg" ref={this.bookImgRef} />
                <button onClick={this.handleUploadImg}>Загрузить</button>
              </div>
              <Field name="book_description" placeholder="Описание">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>{placeholder}</label>
                    <textarea {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <button type="submit" disabled={submitting}>
                Сохранить
              </button>
              <button type="button" onClick={this.handleCancel} disabled={submitting || pristine}>
                Отменить
              </button>
              {loadingBook && <Loader />}
            </form>
          )}
        </Form>
        {/* <pre style={{ width: "1000px", overflow: "hidden" }}>{JSON.stringify(authors, null, 4)}</pre> */}
        <pre style={{ width: "1000px", overflow: "hidden" }}>{JSON.stringify(book, null, 4)}</pre>
      </div>
    );
  }
}

export default BookEdit;
