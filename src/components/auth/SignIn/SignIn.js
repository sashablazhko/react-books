import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import ErrorFormField from "../../UI/ErrorFormField/ErrorFormField";
import Loader from "../../UI/Loader/Loader";

class SignIn extends Component {
  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <div>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
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
        </form>
        <hr />
        <Link to="/auth/signup">Регистрация</Link>
        <p>TODO: Forgot the pass</p>
      </div>
    );
  }
}

export default reduxForm({
  form: "singin",
})(SignIn);
