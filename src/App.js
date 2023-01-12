import React, { Component } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./public/css/customstyle.css";

import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { getCurrentUser } from './services/authservice';
import Navbar from "./components/Navbar";
import NotFound from "./components/not-found";
import Admin from './components/admin/Admin';
import About from './components/Aboutus';
import Home from "./components/Home";
import Signup from "./components/auth/signup";
import Signin from "./components/auth/login";
import Logout from "./components/auth/Logout";
import ProtectedRoute from "./common/ProtectedRoute";



axios.interceptors.response.use(null, error => {

  const expectedError = error.response && error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Bad request Sent to server!");
  }

  return Promise.reject(error);
})
class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });

  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <div className="container-fluid">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/about" component={About} />
            <Route exact path="/not-found" component={NotFound} />
            <ProtectedRoute path="/admin" component={Admin} />
            <Route path="/" exact component={Home} />

            <Redirect to="/not-found" />
          </Switch>


        </div>

      </React.Fragment>
    );
  }
}


export default App;
