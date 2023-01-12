import Input from "../../common/Input";
import { createalbum } from "../../services/albumservice";
import Form from "../../common/Form";
import Joi from "joi-browser";

class Create extends Form {
  async doSumbit() {
    const { title, author, stock, price, desc, img } = this.state.data;
    //create dummy form to send data with image/file;
    const form = new FormData();
    form.append("title", title);
    form.append("author", author);
    form.append("desc", desc);
    form.append("stock", stock);
    form.append("isAvaliable", true);
    form.append("price", price);
    form.append("img", img, img?.name);
    const save = await createalbum(form);

    if (save) return this.props.history.push("/admin/index");
  }

  schema = {
    title: Joi.string().required().label("Title"),
    desc: Joi.string().min(20).required(),
    author: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
  };

  render() {
    const { title, author, desc, stock, price } = this.state.data;
    return (
      <div className="card">
        <div className="card-title">
          <h3 className="alert alert-info">Create Album</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <Input
              onChange={this.handlechange}
              value={title}
              name="title"
              type="text"
              label="Title"
              error={this.state.errors.title}
            />
            <Input
              onChange={this.handlechange}
              value={author}
              name="author"
              type="text"
              label="Author Name"
              error={this.state.errors.author}
            />
            <Input
              onChange={this.handlechange}
              value={desc}
              name="desc"
              type="text"
              label="Descripation"
              error={this.state.errors.desc}
            />

            <Input
              onChange={this.handlechange}
              value={stock}
              name="stock"
              type="number"
              label="In Stock"
              error={this.state.errors.stock}
            />
            <Input
              onChange={this.handlechange}
              value={price}
              name="price"
              type="number"
              label="Album Price"
              error={this.state.errors.price}
            />
            <Input
              onChange={this.filechange}
              name="img"
              type="file"
              label="Cover Image"
            />
            <hr />
            <button
              type="button"
              onClick={this.handleSubmit}
              className="btn btn-success"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
