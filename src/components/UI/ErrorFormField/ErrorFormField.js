import React from "react";
import classes from "./ErrorFormField.module.css";

const ErrorFormField = props => {
  console.log(props);

  const {
    input,
    type,
    meta: { error, touched },
  } = props;
  const errorText = touched && error && <div className={classes.error}>{error}</div>;
  return (
    <div className={classes.ErrorFormField}>
      <label>{input.name}</label>
      <input {...input} type={type} />
      {errorText}
    </div>
  );
};

export default ErrorFormField;
