import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import ErrorFormField from "../../UI/ErrorFormField/ErrorFormField";

class SignIn extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Вход</h2>
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
        <Link to="/auth/signup">Регистрация</Link>
        <p>TODO: Forgot the pass</p>
      </div>
    );
  }
}

export default reduxForm({
  form: "singin",
})(SignIn);
