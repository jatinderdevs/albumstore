import { Component } from "react";
import { Route } from "react-router-dom";
import AdminNavbar from "../../common/AdminNavbar";
import Create from "../admin/create";
import Index from "../admin/index";

import Edit from "../admin/edit";
class Admin extends Component {
  render() {
    return (
      <section>
        <div className="row">
          <div className="col-md-2">
            <h4 className="alert alert-primary">Admin Pannel</h4>
            <AdminNavbar onSelectedItem="" />
          </div>
          <div className="col-md-10">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </nav>

            <Route path="/admin/index" exact component={Index} />
            <Route path="/admin/edit/:id" exact component={Edit} />
            <Route path="/admin/create" exact component={Create} />
          </div>
        </div>
      </section>
    );
  }
}

export default Admin;
