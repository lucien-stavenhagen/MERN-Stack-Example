import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import utils from "../../utils/utils";
export default class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.proxyurl = `${utils.proxyurl_api}/users`;

    this.state = {
      username: "",
      password: ""
    };
  }
  loginUser = () => {
    const addstub = "/login";
    axios
      .post(`${this.proxyurl}${addstub}`, this.state)
      .then(res => {
        const auth_data = {
          username: this.state.username,
          token: res.data.token
        };
        localStorage.setItem(utils.auth_token_name, JSON.stringify(auth_data));
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/loginfailed");
      });
  };
  handleUsername = event => {
    this.setState({ username: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.loginUser();
  };
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-center">Blog Application</h2>
            <h4 className="card-subtitle text-center text-muted">Login</h4>
            <Link to="/newuser">
              <h5 className="card-subtitle text-center text-muted mt-1">
                Don't have an account?
              </h5>
            </Link>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.handleUsername}
                />
                <label>Password:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
                <input
                  type="submit"
                  className="btn btn-primary mt-2"
                  value="Submit User"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
