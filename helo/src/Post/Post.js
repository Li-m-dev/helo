import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: "",
      username: "",
      profile_pic: ""
    };
  }

  getPost = () => {
    axios.get(`/api/post/${this.props.match.params.post_id}`).then(response => {
      // console.log(response);
      this.setState({
        title: response.data[0].title,
        img: response.data[0].img,
        content: response.data[0].content,
        username: response.data[0].username,
        profile_pic: response.data[0].profile_pic
      });
    });
  };

  componentDidMount() {
    this.getPost();
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
    const { title, img, content, username, profile_pic } = this.state;
    return (
      <div className="post-content-box">
        {username}
        <img src={profile_pic} alt={username} />
        <h1> {title}</h1>
        <img src={img} />
        <audio controls>
          <source
            type="audio/mpeg"
            src="http://listen.vo.llnwd.net/g3/1/1/7/1/1/1406911711.mp3"
          />
        </audio>
        <video autoPlay="true" width="300px" height="200px" controls>
          <source
            src="https://www.youtube.com/watch?v=_ZTT9kw3PIE"
            type="video/mp4"
          />
        </video>
        {content}
      </div>
    );
  }
}

export default Post;
