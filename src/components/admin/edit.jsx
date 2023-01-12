import Form from "../../common/Form";
import Input from "../../common/Input";
import Joi from "joi-browser";
import Config from "../../config.json";
import { getalbumdata, updateAlbum } from "../../services/albumservice";
import { toast } from "react-toastify";

class Edit extends Form {
  doSumbit = async () => {
    const aid = this.props.match.params.id;
    const { title, author, stock, price, desc, img, isAvaliable } =
      this.state.data;
    const form = new FormData();
    form.append("title", title);
    form.append("author", author);
    form.append("desc", desc);
    form.append("stock", stock);
    form.append("price", price);
    form.append("img", img);
    form.append("isAvaliable", isAvaliable);
    const update = await updateAlbum(aid, form);
    if (update) {
      toast.success("Record has been updated successfully");
      return this.props.history.push("/admin/index");
    }
  };

  schema = {
    title: Joi.string().required().label("Title"),
    desc: Joi.string().required(),
    author: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    isAvaliable: Joi.boolean(),
  };

  async componentDidMount() {
    const aid = this.props.match.params.id;
    const { data } = await getalbumdata(aid);
    this.setState({ data });
  }

  render() {
    const { title, author, desc, stock, price, img } = this.state.data;

    return (
      <div className="card">
        <div className="card-title">
          <h3 className="alert alert-info">Edit Album</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <Input
              onChange={this.handlechange}
              value={title}
              name="title"
              type="text"
              label="Title"
            />
            <Input
              onChange={this.handlechange}
              value={author}
              name="author"
              type="text"
              label="Author Name"
            />
            <div>
              <label htmlFor="name">isAvaliable</label>
              <select
                className="form-control"
                name="isAvaliable"
                id="isAvaliable"
                onChange={this.handlechange}
              >
                <option value="">select status</option>
                <option value={true}>Yes</option>
                <option value={false}>Not Available</option>
              </select>
            </div>
            <Input
              onChange={this.handlechange}
              value={desc}
              name="desc"
              type="text"
              label="Descripation"
            />
            <Input
              onChange={this.handlechange}
              value={stock}
              name="stock"
              type="number"
              label="In Stock"
            />
            <Input
              onChange={this.filechange}
              name="img"
              type="file"
              label="Cover Image"
            />
            <img src={`${Config.Api}/${img}`} width="10%" alt="" />
            <Input
              onChange={this.handlechange}
              value={price}
              name="price"
              type="number"
              label="Album Price"
            />

            <hr />
            <button
              type="button"
              onClick={this.handleSubmit}
              className="btn btn-success"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Edit;
