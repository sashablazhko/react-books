import React, { Component } from "react";
import classes from "./ChapterEdit.module.css";
import { Form, Field } from "react-final-form";

import Loader from "../../../../UI/Loader/Loader";

class ChapterEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.formRef.current.form.reset();
  }

  render() {
    const { chapter, onSubmit, booksLoading } = this.props;
    const initData = {
      chapterName: chapter.chapterName,
      chapterContent: chapter.chapterContent,
    };
    return (
      <div className={classes.ChapterEdit}>
        <h2>{!chapter ? "Новая глава" : "Редактировать главу"}</h2>
        <Form initialValues={initData} onSubmit={onSubmit} ref={this.formRef}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="chapterName" placeholder="Название главы">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>{placeholder}</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="chapterContent" placeholder="Содержание главы">
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
              {booksLoading && <Loader />}
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default ChapterEdit;
