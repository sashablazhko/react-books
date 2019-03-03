import React, { Component } from "react";
import classes from "./BookEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import { apiHost } from "../../../../../config";
import Loader from "../../../../UI/Loader/Loader";
import ChaptersList from "components/pages/BookPage/ChaptersList/ChaptersList";

class BookEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      authorId: null,
      bookImg: this.props.currentImg,
      bookDescription: "",
    };
    this.formRef = React.createRef();
    this.bookImgRef = React.createRef();
    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.handleDeleteImg = this.handleDeleteImg.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentImg !== state.bookImg) {
      return {
        bookImg: props.currentImg,
      };
    }
    return null;
  }

  componentDidMount() {
    const { book } = this.props;
    if (book) {
      this.setState({
        bookName: book.bookName,
        authorId: book.authorId,
        bookImg: book.bookImg,
        bookDescription: book.bookDescription,
      });
    } else {
      this.setState({
        ...this.state,
        authorId: this.props.authors[0].idAuthor,
      });
    }
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
    if ((this.props.book && this.props.book.bookImg !== "noimage.jpg") || this.state.bookImg !== "noimage.jpg") {
      this.props.onDeleteImg();
    }
  }

  handleCancel() {
    const { book } = this.props;
    if (book) {
      this.setState({
        bookName: book.bookName,
        authorId: book.authorId,
        bookImg: book.bookImg,
        bookDescription: book.bookDescription,
      });
    } else {
      this.setState({
        bookName: "",
        authorId: this.props.authors[0].idAuthor,
        bookDescription: "",
      });
    }
    this.formRef.current.form.reset();
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { book, onSubmit, booksLoading, authors, authorsLoading } = this.props;
    return (
      <div className={classes.BookEdit}>
        <h2>{!book ? "Новая книга" : "Редактировать книгу"}</h2>
        {book && (
          <React.Fragment>
            <Link to={`/admin/books/${book.idBook}/new`}>
              <button>Добавить главу</button>
            </Link>
            <hr />
          </React.Fragment>
        )}
        {book && <ChaptersList chapters={book.chapters} />}
        <Form
          initialValues={this.state}
          onSubmit={onSubmit}
          ref={this.formRef}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="bookName" placeholder="Название книги" inputOnChange={this.handleChange}>
                {({ input, meta, placeholder, inputOnChange }) => (
                  <div className="row">
                    <label>{placeholder}</label>
                    <input
                      {...input}
                      placeholder={placeholder}
                      onChange={e => {
                        input.onChange(e);
                        inputOnChange && inputOnChange(e, input.name);
                      }}
                    />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="authorId" placeholder="Автор" component="select">
                {({ input, meta, placeholder }) => {
                  return (
                    <div className="row">
                      <label>{placeholder}</label>
                      <select {...input} onChange={e => this.setState({ authorId: e.target.value })}>
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
                <img src={`${apiHost}/uploads/${this.props.currentImg}`} alt={book ? book.bookName : "no image"} />
                <p>{`${apiHost}/uploads/${this.props.currentImg}`}</p>
                <Field name="bookImg" placeholder="Изображение">
                  {({ input, meta, placeholder }) => (
                    <div className="row">
                      <label>{placeholder}</label>
                      <input {...input} placeholder={placeholder} disabled />
                      {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                    </div>
                  )}
                </Field>
                <input type="file" name="bookImg" ref={this.bookImgRef} />
                <button onClick={this.handleUploadImg}>Загрузить</button>
                <button onClick={this.handleDeleteImg}>Удалить</button>
              </div>
              <Field name="bookDescription" placeholder="Описание" inputOnChange={this.handleChange}>
                {({ input, meta, placeholder, inputOnChange }) => (
                  <div className="row">
                    <label>{placeholder}</label>
                    <textarea
                      {...input}
                      placeholder={placeholder}
                      onChange={e => {
                        input.onChange(e);
                        inputOnChange && inputOnChange(e, input.name);
                      }}
                    />
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
        {/* <pre style={{ width: "1000px", overflow: "hidden" }}>{JSON.stringify(authors, null, 4)}</pre> 
        <pre style={{ width: "1000px", overflow: "hidden" }}>{JSON.stringify(book, null, 4)}</pre>*/}
      </div>
    );
  }
}

const validate = val => {
  const err = {};
  if (!val.bookName) {
    err.bookName = "Не может быть пустым";
  } else if (val.bookName.length < 3) {
    err.bookName = "Слишком короткое";
  }
  if (!val.bookDescription) {
    err.bookDescription = "Не может быть пустым";
  } else if (val.bookDescription.length < 3) {
    err.bookDescription = "Слишком короткое";
  }
  return err;
};

export default BookEdit;
