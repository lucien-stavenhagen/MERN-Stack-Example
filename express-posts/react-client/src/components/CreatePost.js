import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.proxyurl = "http://localhost:4001/api/posts";
    this.state = {
      title: "",
      author: "",
      category: "",
      posttext: ""
    };
  }
  createPost = newpost => {
    axios
      .post(this.proxyurl + "/create", newpost)
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

  handleTitle = event => {
    this.setState({ title: event.target.value });
  };
  handleAuthor = event => {
    this.setState({ author: event.target.value });
  };
  handleCategory = event => {
    this.setState({
      category: event.target.value
    });
  };
  handlePosttext = event => {
    this.setState({ posttext: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("submitting this post: " + JSON.stringify(this.state));
    this.createPost(this.state);
    this.clearState();
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.handleTitle}
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.author}
              onChange={this.handleAuthor}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.category}
              onChange={this.handleCategory}
            />
          </div>
          <div className="form-group">
            <label>Post Text:</label>
            <textarea
              className="form-control"
              value={this.state.posttext}
              onChange={this.handlePosttext}
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
