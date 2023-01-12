import { Component } from "react";
import Axios from "axios";
import Config from "../../config.json";
import { removealbum } from "../../services/albumservice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Index extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const { data } = await Axios.get(Config.Api + "/");
    this.setState({ data: data });
  }
  handleRemove = async (albumId) => {
    if (!window.confirm("Are you sure you want to remove this record"))
      return alert("Request has been cancelled");
    const originalData = this.state.data;
    //if (!remove) return alert("somethig went wrong");
    const updated = this.state.data.filter((x) => x._id !== albumId);
    this.setState({ data: updated });
    try {
      await removealbum(albumId);
      toast.success("Record has been deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Record has already deleted");

      this.setState({ data: originalData });
    }
  };

  render() {
    return (
      <div>
        <h2 className="alert alert-info">Albums</h2>
        <table className="table text-center table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((album) => {
              return (
                <tr key={album._id}>
                  <td>
                    <img
                      style={{ width: 50 }}
                      src={`${Config.Api}/${album.img}`}
                      className="img-fluid"
                      alt=""
                    />
                  </td>
                  <td>{album.title}</td>
                  <td>{album.author}</td>
                  <td>{album.price}</td>
                  <td>{album.stock}</td>
                  <td>
                    <Link
                      to={`/admin/edit/${album._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      onClick={() => this.handleRemove(album._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Index;
