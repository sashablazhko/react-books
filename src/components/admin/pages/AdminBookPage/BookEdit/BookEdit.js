import React, { Component } from "react";
import classes from "./BookEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import { apiHost } from "../../../../../config";
import Loader from "../../../../UI/Loader/Loader";

class BookEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.bookImgRef = React.createRef();
    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.handleDeleteImg = this.handleDeleteImg.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleUploadImg(e) {
    e.preventDefault();
    const file = this.bookImgRef.current.files[0];
    if (file) {
      this.props.onUploadImg(file);
    }
  }

  handleDeleteImg(e) {
    e.preventDefault();
    if (this.props.book.bookImg !== "noimage.jpg") {
      this.props.onDeleteImg();
    }
  }

  handleCancel() {
    this.formRef.current.form.reset();
  }

  render() {
    const { book, onSubmit, booksLoading, authors, authorsLoading, onDeleteImg } = this.props;
    const initData = {
      bookName: book.bookName,
      authorId: book.authorId,
      bookImg: book.bookImg,
      bookDescription: book.bookDescription,
    };
    return (
      <div className={classes.BookEdit}>
        <h2>{!book ? "Новая книга" : "Редактировать книгу"}</h2>
        <Form initialValues={initData} onSubmit={onSubmit} ref={this.formRef}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="bookName" placeholder="Название книги">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>{placeholder}</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="authorId" placeholder="Автор" component="select">
                {({ input, meta, placeholder }) => {
                  return (
                    <div className="row">
                      <label>{placeholder}</label>
                      <select value={input.value} {...input}>
                        {authors.map(author => {
                          return (
                            <option value={author.idAuthor} key={author.idAuthor}>
                              {author.authorName}
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
                <img src={`${apiHost}/uploads/${book.bookImg}`} alt={book.bookName} />
                <p>{`${apiHost}/uploads/${book.bookImg}`}</p>

                <input
                  type="text"
                  name="bookImgString"
                  value={`${apiHost}/uploads/${book.bookImg}`}
                  onChange={() => {}}
                />
                <Field name="bookImg" placeholder="Изображение">
                  {({ input, meta, placeholder }) => (
                    <div className="row">
                      <label>{placeholder}</label>
                      <input {...input} placeholder={placeholder} />
                      {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                    </div>
                  )}
                </Field>

                <input type="file" name="bookImg" ref={this.bookImgRef} />
                <button onClick={this.handleUploadImg}>Загрузить</button>
                <button onClick={this.handleDeleteImg}>Удалить</button>
              </div>
              <Field name="bookDescription" placeholder="Описание">
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
              {(booksLoading || authorsLoading) && <Loader />}
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
