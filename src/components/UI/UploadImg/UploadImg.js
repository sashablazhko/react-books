import React, { Component } from "react";
import classes from "./UploadImg.module.css";
import { Form, Field } from "react-final-form";
import { apiHost } from "../../../config";

class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.bookImgRef = React.createRef();
    this.handleUploadImg = this.handleUploadImg.bind(this);
    this.handleDeleteImg = this.handleDeleteImg.bind(this);
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
    if ((this.props.book && this.props.book.bookImg !== "noimage.jpg") || this.props.newBookImg !== "noimage.jpg") {
      this.props.onDeleteImg();
    }
  }

  render() {
    const { book, onSubmit, booksLoading, authors, authorsLoading, newBookImg, imgSrc, imgAlt } = this.props;
    return (
      <div className={classes.UploadImg}>
        <Form initialValues={{}} onSubmit={this.handleUploadImg}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <div className="row">
              <label>Обложка</label>
              <img src={imgSrc} alt={imgAlt} />
              <p>{imgSrc}</p>

              <input type="text" name="bookImgString" value={imgSrc} onChange={() => {}} />
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
          )}
        </Form>
      </div>
    );
  }
}

export default UploadImg;
