import { Component } from "react";
import { Link } from "react-router-dom";
class AdminNavbar extends Component {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item ">
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className="list-group-item ">
          <Link to="/admin/index">Index</Link>
        </li>
        <li className="list-group-item ">
          <Link to="/admin/create">Create</Link>
        </li>
        <li className="list-group-item ">
          <Link to="/admin">FAQ</Link>
        </li>
      </ul>
    );
  }
}

export default AdminNavbar;
