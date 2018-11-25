import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import emailValidator from "email-validator";
import ErrorFormField from "../../UI/ErrorFormField/ErrorFormField";
import Loader from "../../UI/Loader/Loader";

const SignUp = props => {
  const { handleSubmit, loading } = props;
  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="email" label="email" component={ErrorFormField} />
        </div>
        <div>
          <Field name="password" label="пароль" component={ErrorFormField} type="password" />
        </div>
        <div className="btn__wrapper">
          <div>
            <button type="submit">Регистрация</button>
          </div>
          {loading && <Loader />}
        </div>
      </form>
      <hr />
      <Link to="/auth/signin">Вход</Link>
    </div>
  );
};

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) errors.email = "Введите email";
  else if (!emailValidator.validate(email)) errors.email = "Некорректный email";

  if (!password) errors.password = "Введите пароль";
  else if (password.length < 3) errors.password = "Не менее 3х символов";

  return errors;
};

export default reduxForm({
  form: "singin",
  validate,
})(SignUp);
