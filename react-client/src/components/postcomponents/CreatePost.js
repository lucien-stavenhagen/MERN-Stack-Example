import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import utils from "../../utils/utils";

class CreatePost extends Component {
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
  createPost = auth_token => {
    axios
      .post(this.proxyurl + "/create", this.state, {
        headers: { authorization: `Bearer ${auth_token}` }
      })
      .then(res => console.log(res))
      .catch(err => console.log("HOMEY ERROR: " + err));
  };
  clearState = () =>
    this.setState({
      title: "",
      author: "",
      category: "",
      posttext: ""
    });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const auth_info = utils.getTokenFromLocal();
    if (auth_info.loggedin) {
      console.log("submitting this post: " + JSON.stringify(this.state));
      this.createPost(auth_info.token);
      this.clearState();
    } else {
      console.log("Posting failed");
    }
  };
  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center m-0">
          <h1>Create New Post</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={this.state.category}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Post Text:</label>
            <textarea
              name="posttext"
              className="form-control"
              value={this.state.posttext}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary mr-1"
              value="Submit Post"
            />
            <Link to="/" className="btn btn-secondary">
              Done
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
