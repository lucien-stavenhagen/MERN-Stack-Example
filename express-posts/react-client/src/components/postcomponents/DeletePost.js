import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import utils from "../../utils/utils";

export default class DeletePost extends Component {
  constructor(props) {
    super(props);
    this.proxyurl = "http://localhost:4001/api/posts";
  }
  yesImSure = () => {
    const auth_token = localStorage.getItem(utils.auth_token_name);
    axios
      .delete(this.proxyurl + "/delete/" + this.props.match.params.id, {
        headers: { authorization: `Bearer ${auth_token}` }
      })
      .then(res => {
        console.log("deleted post :" + res);
        this.props.history.push("/delconfirmed");
      })
      .catch(err => console.log("HOMEY ERROR: " + err));
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
