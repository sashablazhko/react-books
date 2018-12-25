import React, { Component } from "react";
import classes from "./SignIn.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.formRef.current.form.reset();
  }

  render() {
    const { onSubmit, loading } = this.props;
    return (
      <div className={classes.SignIn}>
        <h2>Вход</h2>
        {/* <form onSubmit={handleSubmit}>
          <div>
            <Field name="email" label="email" component={ErrorFormField} />
          </div>
          <div>
            <Field name="password" label="пароль" component={ErrorFormField} type="password" />
          </div>
          <div className="btn__wrapper">
            <div>
              <button type="submit">Войти</button>
            </div>
            {loading && <Loader />}
          </div>
        </form> */}
        <Form onSubmit={onSubmit} validate={validate} ref={this.formRef}>
          {({ handleSubmit, submitting, pristine, values, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Field name="userName" placeholder="Имя">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Имя</label>
                    <input {...input} placeholder={placeholder} autoComplete="username" />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="userPass" placeholder="Пароль">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Пароль</label>
                    <input {...input} placeholder={placeholder} type="password" autoComplete="current-password" />
                    {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <div className="btn__wrapper">
                <button type="submit" disabled={submitting}>
                  Войти
                </button>
                {loading && <Loader />}
                <button type="button" onClick={this.handleReset} disabled={submitting || pristine}>
                  Reset
                </button>
              </div>
            </form>
          )}
        </Form>
        <hr />
        <Link to="/auth/signup">Регистрация</Link>
        <p>TODO: Forgot the pass</p>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.userName) {
    errors.userName = "Не может быть пустым";
  }
  if (!values.userPass) {
    errors.userPass = "Не может быть пустым";
  } else if (values.userPass.length < 3) {
    errors.userPass = "Не менее трех символов";
  }
  return errors;
};

export default SignIn;
