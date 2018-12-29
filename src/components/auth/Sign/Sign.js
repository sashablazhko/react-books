import React, { Component } from "react";
import classes from "./Sign.module.css";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import emailValidator from "email-validator";
import Loader from "../../UI/Loader/Loader";
import ReCAPTCHA from "react-google-recaptcha";

class Sign extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.formRef.current.form.reset();
  }

  handleCaptchaChange = reCaptcha => {
    console.log("Captcha value:", reCaptcha);
  };

  validate = values => {
    const errors = {};
    if (!values.userEmail) {
      errors.userEmail = "Не может быть пустым";
    } else if (!emailValidator.validate(values.userEmail)) {
      errors.userEmail = "Некорректный email";
    }
    if (!values.userPass) {
      errors.userPass = "Не может быть пустым";
    } else if (values.userPass.length < 3) {
      errors.userPass = "Не менее трех символов";
    }
    if (!values.reCaptcha && this.props.signup) {
      errors.reCaptcha = "reCAPTCHA обязательна";
    }
    return errors;
  };

  render() {
    const { signup, onSubmit, loading } = this.props;
    return (
      <div className={classes.Sign}>
        <h2>{signup ? "Регистрация" : "Вход"}</h2>
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
        <Form onSubmit={onSubmit} validate={this.validate} ref={this.formRef}>
          {({ handleSubmit, submitting, pristine, values, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Field name="userEmail" placeholder="Email">
                {({ input, meta, placeholder }) => (
                  <div className="row">
                    <label>Email</label>
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
              {signup && (
                <Field name="reCaptcha">
                  {({ input, meta }) => (
                    <div>
                      <ReCAPTCHA
                        style={{ display: "inline-block" }}
                        sitekey="6Len338UAAAAACnubnwaaj--S1zY93FoZ-37Ie5n"
                        // onChange={this.handleCaptchaChange}
                        onChange={input.onChange}
                      />
                      {meta.error && meta.touched && <div className={classes.error}>{meta.error}</div>}
                    </div>
                  )}
                </Field>
              )}
              <div className="btn__wrapper">
                <button type="submit" disabled={submitting}>
                  {signup ? "Регистрация" : "Вход"}
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
        {signup ? <Link to="/auth/signin">Вход</Link> : <Link to="/auth/signup">Регистрация</Link>}
        {!signup && <p>TODO: Forgot the pass</p>}
      </div>
    );
  }
}

export default Sign;
