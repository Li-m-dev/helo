import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
      content: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = () => {
    const { title, img, content } = this.state;
    axios
      .post(`/api/post/new`, { title, img, content })
      .then(() => this.props.history.push("/dashboard"));
  };

  render() {
    // console.log(this.props);
    return (
      <div className="form-container">
        <h1>New Post</h1>
        <h3>Title:</h3>
        <input
          onChange={this.handleChange}
          name="title"
          value={this.state.title}
        />
        <div className="img-preview"> img preview</div>
        <h3>Image URL: </h3>
        <input onChange={this.handleChange} name="img" value={this.state.img} />
        <h3> Content: </h3>
        <input
          className="content-input"
          onChange={this.handleChange}
          name="content"
          value={this.state.content}
        />
        <button onClick={this.createPost}>Post</button>
      </div>
    );
  }
}

export default Form;
