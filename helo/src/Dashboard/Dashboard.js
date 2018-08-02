import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      checkBox: true,
      posts: []
    };
  }

  getPosts = () => {
    const { checkBox, searchTerm } = this.state;
    axios
      .get(`/api/posts/?userposts=${checkBox}&search=${searchTerm}`)
      .then(response => {
        // console.log(response);
        this.setState({
          posts: response.data
        });
      })
      .then(this.resetInput());
  };

  componentDidMount() {
    this.getPosts();
  }

  handleChecked = () => {
    this.setState({
      checkBox: !this.state.checkBox
    });
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value });
  };
  resetInput = () => {
    this.setState({
      searchTerm: ""
    });
  };
  render() {
    // console.log("see here", this.props);
    // console.log(this.state);
    const postToDisplay = this.state.posts.map((post, i) => {
      return (
        <div className="dash-post-box">
          <div key={i} className="dash-post">
            <Link to={`/post/${post.post_id}`}>
              <p>{post.title}</p>
              <p>{post.username}</p>
              <img src={post.img} alt={post.title} />
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div className="dash-container">
        <div className="dash-content dash-top-box">
          <input
            value={this.state.searchTerm}
            onChange={this.handleSearch}
            type="text"
          />

          <button onClick={this.getPosts}>Search</button>
          <button onClick={this.resetInput}>Reset</button>

          <div>
            My Posts<input
              type="checkbox"
              onClick={this.handleChecked}
              defaultChecked
            />
          </div>
        </div>
        <div className="dash-content dash-main-box">{postToDisplay}</div>
      </div>
    );
  }
}

export default Dashboard;
