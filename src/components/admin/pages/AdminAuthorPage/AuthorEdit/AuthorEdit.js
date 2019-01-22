import React, { Component } from "react";
import classes from "./AuthorEdit.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";

import Loader from "../../../../UI/Loader/Loader";

class AuthorEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { author_name: this.props.author.author_name };
    this.formRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.formRef.current.form.reset();
  }

  render() {
    const { author, onSubmit, loading } = this.props;
    return (
      <div className={classes.AuthorEdit}>
        <h2>{!author ? "Создать автора" : "Редактировать автора"}</h2>
        <Form initialValues={this.state} onSubmit={onSubmit} ref={this.formRef}>
          {({ handleSubmit, values, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field name="author_name" placeholder="Автор">
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>Автор (ФИ)</label>
                    <input {...input} placeholder={placeholder} />
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

export default AuthorEdit;
