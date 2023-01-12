import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "../../common/Form";
import Input from "../../common/Input";
import { signIn } from "../../services/authservice";

import { getCurrentUser } from "../../services/authservice";
class Login extends Form {
  doSumbit = async () => {
    const { username, password } = this.state.data;
    try {
      await signIn(username, password);
      //state from protected route
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/admin";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  schema = {
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
  };
  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2 className="alert alert-info">Sign In</h2>
            <form onSubmit={this.handleSubmit}>
              <Input
                label="User Name"
                onChange={this.handlechange}
                type="text"
                name="username"
                error={this.state.errors.username}
              />
              <Input
                label="Password"
                onChange={this.handlechange}
                type="password"
                name="password"
                error={this.state.errors.password}
              />
              <hr />
              <button className="btn btn-primary">Sign In</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default Login;
