import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class DeletePost extends Component {
  constructor(props) {
    super(props);
    this.proxyurl = "http://localhost:4001/api/posts";
  }
  yesImSure = () => {
    axios
      .delete(this.proxyurl + "/delete/" + this.props.match.params.id)
      .then(res => {
        console.log("deleted post :" + res);
      })
      .catch(err => console.log("HOMEY ERROR: " + err));
    this.props.history.push("/delconfirmed");
  };
  render() {
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h3>Are you sure?</h3>
          <div className="button-group">
            <button className="btn btn-danger mr-1" onClick={this.yesImSure}>
              Yes
            </button>
            <Link to="/" className="btn btn-primary">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
