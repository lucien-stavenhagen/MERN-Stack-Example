import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import utils from "../../utils/utils";

export default class EditPost extends Component {
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

  updatePost = () => {
    const updated = {
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      posttext: this.state.posttext
    };
    const auth_token = utils.getTokenFromLocal();
    if (auth_token.loggedin) {
      axios
        .patch(this.proxyurl + "/edit/" + this.props.match.params.id, updated, {
          headers: { authorization: `Bearer ${auth_token.token}` }
        })
        .then(res => console.log("post updated. status: " + res))
        .catch(err => console.log("HOMEY UPDATE ERROR: " + err));
    }
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("submitting this post: " + JSON.stringify(this.state));
    this.updatePost();
    this.props.history.push("/editconfirmed");
  };
  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center mb-1">
          <h2>Edit post</h2>
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
              value="Update Post"
            />
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
