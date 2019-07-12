import React, { Component } from "react";
import axios from "axios";

export default class EditPost extends Component {
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

  updatePost = () => {
    const updated = {
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      posttext: this.state.posttext
    };
    axios
      .patch(this.proxyurl + "/edit/" + this.props.match.params.id, updated)
      .then(res => console.log("post updated. status: " + res))
      .catch(err => console.log("HOMEY UPDATE ERROR: " + err));
  };
  handleTitle = event => {
    this.setState({ title: event.target.value });
  };
  handleAuthor = event => {
    this.setState({ author: event.target.value });
  };
  handleCategory = event => {
    this.setState({
      category: event.target.value ? event.target.value : "general"
    });
  };
  handlePosttext = event => {
    this.setState({ posttext: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("submitting this post: " + JSON.stringify(this.state));
    this.updatePost();
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
              className="btn btn-primary"
              value="Update Post"
            />
          </div>
        </form>
      </div>
    );
  }
}