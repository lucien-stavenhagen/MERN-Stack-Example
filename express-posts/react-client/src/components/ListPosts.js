import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ListPosts extends React.Component {
  constructor(props) {
    super(props);
    this.proxyurl = "http://localhost:4001/api/posts";
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios
      .get(this.proxyurl)
      .then(posts => this.setState({ data: posts.data }))
      .catch(err => console.log("HOMEY ERROR: " + err));
  }

  render() {
    return (
      <div className="container">
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
              <Link to={"/edit/" + post._id} className="btn btn-primary">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ListPosts;
