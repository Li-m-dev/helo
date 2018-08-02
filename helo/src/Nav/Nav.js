import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUser, getMe } from "../ducks/reducer";
import logImg from "../access/loginBtn.png";
import home from "../access/homeIcon.png";
import newPost from "../access/addNewPost.png";
import profile from "../access/cool.jpeg";

class Nav extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getMe();
  }

  render() {
    console.log(this.props);
    return (
      <div className="nav-bar">
        <img src={profile} alt="profile" className="profile-img" />

        <Link to="/dashboard">
          <img src={home} alt="Home" className="nav-img" />
        </Link>
        <Link to="/new">
          <img src={newPost} alt="New Post" className="nav-img" />
        </Link>
        <Link to="/">
          <img src={logImg} alt="Login/Logout" className="nav-img" />
        </Link>
        {this.props.username}
        <img
          src={`https://robohash.org/${this.props.profile_pic}`}
          alt={this.props.username}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    getMe
  }
)(Nav);
