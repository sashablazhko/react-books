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
    let initData = { chapterName: "", chapterContent: "" };
    if (chapter) {
      initData = {
        chapterName: chapter.chapterName,
        chapterContent: chapter.chapterContent,
      };
    }

    return (
      <div className={classes.ChapterEdit}>
        <h2>{!chapter ? "Новая глава" : "Редактировать главу"}</h2>
        <Form initialValues={initData} onSubmit={onSubmit} ref={this.formRef} validate={validate}>
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

const validate = val => {
  const err = {};
  if (!val.chapterName) {
    err.chapterName = "Не может быть пустым";
  } else if (val.chapterName.length < 3) {
    err.chapterName = "Слишком короткое";
  }
  if (!val.chapterContent) {
    err.chapterContent = "Не может быть пустым";
  } else if (val.chapterContent.length < 3) {
    err.chapterContent = "Слишком короткое";
  }
  return err;
};

export default ChapterEdit;
