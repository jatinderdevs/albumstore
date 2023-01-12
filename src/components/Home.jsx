import React, { Component } from "react";
import Axios from "axios";
import Config from "../config.json";
import bannerimg from "../images/banner.png";
class Home extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const { data } = await Axios.get(Config.Api + "/");

    const filteredData = data.filter((x) => x.isAvaliable === true);

    filteredData.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    this.setState({ data: filteredData });
  }
  render() {
    return (
      <React.Fragment>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="bannertxt">
                  <h1>Welcome to my React App</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Officia soluta perspiciatis sequi corrupti distinctio
                    recusandae qui eos magni esse doloremque neque similique
                    explicabo error, nam dignissimos dolor aliquid perferendis
                    quo.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
              <div className="col-md-6">
                <img src={bannerimg} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="row">
            {this.state.data.map((album) => {
              return (
                <div className="col-md-3" key={album._id}>
                  <div className="card ">
                    <div className="card-title">
                      <h5 className="alert alert-info text-capitalize m-0">
                        {album.title}
                      </h5>
                    </div>
                    <div className="card-body text-center p-0 bg-white">
                      <div className="aimg">
                        <img
                          src={`${Config.Api}/${album.img}`}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="card-footer bg-info">
                      <h5>{album.author}</h5>
                      <span className="badge badge-light">
                        Price:{album.price}
                      </span>
                      <span className="badge badge-warning ">
                        Stock:{album.stock}
                      </span>
                      <hr />
                      <button
                        type="button"
                        className="btn btn-dark btn-sm float-right"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Home;
