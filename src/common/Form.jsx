import { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {
      img: null,
    },
    errors: {},
  };
  validateproperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }
  handlechange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateproperty(e.currentTarget);

    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  validateform = () => {
    const data = { ...this.state.data };
    delete data._id;
    delete data.img;
    const { error } = Joi.validate(data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    let errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateform();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSumbit();
  };
  filechange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.files[0];
    this.setState({ data });
  };
}

export default Form;
