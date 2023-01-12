import { Component } from "react";
import { logout } from "../../services/authservice";
class Logout extends Component {
  componentDidMount() {
    //to log out the user
    logout();
  }
  render() {
    return null;
  }
}

export default Logout;
