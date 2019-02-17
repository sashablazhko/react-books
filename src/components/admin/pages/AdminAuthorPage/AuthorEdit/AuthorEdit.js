import React, { Component } from "react";
import classes from "./AuthorEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import Loader from "../../../../UI/Loader/Loader";

class AuthorEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.formRef.current.form.reset();
  }

  render() {
    const { author, onSubmit, loading } = this.props;
    let initData = { authorName: "" };
    if (author) {
      initData = { authorName: author.authorName };
    }
    return (
      <div className={classes.AuthorEdit}>
        <h2>{!author ? "Новый автор" : "Редактировать автора"}</h2>
        <Form initialValues={initData} onSubmit={onSubmit} ref={this.formRef} validate={validate}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="authorName" placeholder="Автор">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Автор (ФИ)</label>
                    <input {...input} placeholder={placeholder} />
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
              {loading && <Loader />}
            </form>
          )}
        </Form>
      </div>
    );
  }
}

const validate = val => {
  const err = {};
  if (!val.authorName) {
    err.authorName = "Не может быть пустым";
  } else if (val.authorName.length < 3) {
    err.authorName = "Слишком короткое";
  }
  return err;
};

export default AuthorEdit;
