import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import utils from "../../utils/utils";

class ListPosts extends React.Component {
  constructor(props) {
    super(props);
    this.proxyurl = `${utils.proxyurl_api}/posts`;
    this.state = {
      data: [],
      loggedin: true
    };
  }
  componentDidMount() {
    if (localStorage.getItem(utils.auth_token_name) !== null) {
      this.setState({ loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
    axios
      .get(this.proxyurl)
      .then(posts => this.setState({ data: posts.data }))
      .catch(err => console.log("HOMEY ERROR: " + err));
  }

  render() {
    let log_button;
    let new_post_button;
    let edit_post_button;
    let delete_post_button;

    if (this.state.loggedin) {
      log_button = <Link to="/logoff">Logoff</Link>;
      new_post_button = (
        <button className="btn btn-warning">Create New Post</button>
      );
      edit_post_button = (
        <button className="btn btn-primary mr-1">Edit Post</button>
      );
      delete_post_button = (
        <button className="btn btn-danger">Delete Post</button>
      );
    } else {
      log_button = <Link to="/login">Login here</Link>;
      new_post_button = (
        <button className="btn btn-warning" disabled>
          Create New Post (disabled)
        </button>
      );
      edit_post_button = (
        <button className="btn btn-primary mr-1" disabled>
          Edit Post (disabled)
        </button>
      );
      delete_post_button = (
        <button className="btn btn-danger" disabled>
          Delete Post (disabled)
        </button>
      );
    }
    return (
      <div className="container">
        <div className="jumbotron text-center m-0">
          <Link to="/">
            <h1>Homey Blog</h1>
          </Link>
          {log_button}
        </div>
        <div className="button-group btn-group-lg">
          <Link to="/create">{new_post_button}</Link>
        </div>
        <div className="card">
          {this.state.data.map(post => (
            <div key={post._id} className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">
                <span>
                  by: {post.author} on {post.date}
                </span>
                <br />
                <span>category: {post.category}</span>
                <br />
                <span>{post.posttext}</span>
              </p>
              <Link to={"/edit/" + post._id}>{edit_post_button}</Link>
              <Link to={"/delete/" + post._id}>{delete_post_button}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ListPosts;
