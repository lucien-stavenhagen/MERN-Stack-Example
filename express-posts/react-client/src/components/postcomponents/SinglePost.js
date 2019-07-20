import React, { Component } from "react";
import { Link } from "react-router-dom";
import utils from "../../utils/utils";
import axios from "axios";

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.proxyurl = `${utils.proxyurl_api}/posts`;
    this.state = {
      title: "",
      author: "",
      category: "",
      posttext: ""
    };
  }
  componentDidMount() {
    this.getPostById();
  }
  getPostById = () => {
    axios
      .get(this.proxyurl + "/" + this.props.match.params.id)
      .then(res => {
        console.log("headers: " + JSON.stringify(res.headers));
        this.setState(res.data);
      })
      .catch(err => console.log("HOMEY ERROR: " + err));
  };
  render() {
    return (
      <div className="container">
        <div className="border jumbotron text-center m-1">
          <Link to="/">
            <h1>Homey Blog</h1>
          </Link>
        </div>
        <div className="border card m-1">
          <h3 className="card-title text-center">{this.state.title}</h3>
          <div className="card-body">
            <p className="card-text">
              <span>
                by: {this.state.author} on {this.state.date}
              </span>
              <br />
              <span>category: {this.state.category}</span>
              <br />
              <span>{this.state.posttext}</span>
            </p>
          </div>
        </div>
        <Link to="/">
          <button className="btn btn-primary">Home</button>
        </Link>
      </div>
    );
  }
}
