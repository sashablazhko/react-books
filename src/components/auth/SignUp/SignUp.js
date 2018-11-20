import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import emailValidator from "email-validator";
import ErrorFormField from "../../UI/ErrorFormField/ErrorFormField";

const SignUp = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="email" component={ErrorFormField} />
        </div>
        <div>
          <Field name="password" component={ErrorFormField} type="password" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      <Link to="/auth/signin">Вход</Link>
    </div>
  );
};

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) errors.email = "Введите email";
  else if (emailValidator.validate(email)) errors.email = "Некорректный email";

  if (!password) errors.password = "Введите пароль";
  else if (password.length < 3) errors.password = "Не менее 3х символов";

  return errors;
};

export default reduxForm({
  form: "singin",
  validate,
})(SignUp);
