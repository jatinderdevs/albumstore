import { Component } from "react";

const Input = ({ label, name, value, onChange, type, error }) => {
  return (
    <div>
      <label htmlFor="name">{label}</label>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
