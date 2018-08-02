import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getUser } from "../ducks/reducer";
import logo from "../access/logo.png";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  createUser = () => {
    const { username, password } = this.state;
    axios
      .post("/api/users/new", { username, password })
      .then(() => this.props.history.push("/dashboard"));
  };

  selectUser = () => {
    const { username, password } = this.state;

    axios
      .post("/api/user", { username, password })
      .then(response => {
        console.log(response);
        const { username, profile_pic } = response.data;
        this.props.getUser(username, profile_pic);
      })
      .then(() => this.props.history.push("/dashboard"));
  };

  render() {
    // console.log(this.props);
    return (
      <div className="auth_container">
        <img src={logo} alt="logo" />
        <div className="auth_input_box">
          <p>Username: </p>
          <input
            onChange={this.handleChange}
            value={this.state.name}
            name="username"
            type="text"
          />
        </div>

        <div className="auth_input_box">
          <p>Password: </p>
          <input
            className="auth_input_box"
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="text"
          />
        </div>
        <div className="auth_btn_container">
          <button onClick={this.selectUser}>Login</button>
          <button onClick={this.createUser}>Register</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getUser }
)(Auth);
