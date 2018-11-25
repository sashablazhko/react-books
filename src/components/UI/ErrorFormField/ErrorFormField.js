import React from "react";
import classes from "./ErrorFormField.module.css";

const ErrorFormField = props => {
  const {
    input,
    label,
    type,
    meta: { error, touched },
  } = props;
  const errorText = touched && error && <div className={classes.error}>{error}</div>;
  return (
    <div className={classes.ErrorFormField}>
      <label>{label}</label>
      <input {...input} type={type} />
      {errorText}
    </div>
  );
};

export default ErrorFormField;
