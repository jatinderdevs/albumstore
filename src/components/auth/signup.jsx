import Form from "../../common/Form";
import Joi from "joi-browser";
import Input from "../../common/Input";
import { signUp } from "../../services/authservice";
import { toast } from "react-toastify";

class SignUp extends Form {
  doSumbit = async () => {
    const user = this.state.data;
    console.log(user);
    try {
      await signUp(user);
      toast.success("user created successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  schema = {
    username: Joi.string().min(4).required().label("Username"),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6),
    Cpassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
  };
  render() {
    const { username, email, password, Cpassword } = this.state.data;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 pt-4">
            <h2>Sign Up </h2>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <Input
                onChange={this.handlechange}
                label="username"
                name="username"
                type="text"
                value={username}
                error={this.state.errors.username}
              />
              <Input
                onChange={this.handlechange}
                label="Email"
                name="email"
                type="email"
                value={email}
                error={this.state.errors.email}
              />
              <Input
                onChange={this.handlechange}
                label="password"
                name="password"
                type="password"
                value={password}
                error={this.state.errors.password}
              />
              <Input
                onChange={this.handlechange}
                label="Confirm password"
                name="Cpassword"
                type="password"
                value={Cpassword}
                error={this.state.errors.Cpassword}
              />
              <hr />
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default SignUp;
