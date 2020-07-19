import React, { Component } from "react";
import axios from "axios";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.onChangeLink_download = this.onChangeLink_download.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      link_download: "",
    };
  }

  onChangeLink_download(e) {
    this.setState({
      link_download: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const link = {
      download_link: this.state.link_download,
    };

    console.log(this.state.link_download);

    axios
      .post("http://localhost:3001/download/", link)
      .then((res) => console.log(res.data));

    this.setState({
      download_link: "",
    });
  }

  render() {
    return (
      <div style={{ width: "50%" }}>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Link bandcamp</label>
            <input
              required
              className="form-control"
              placeholder="Enter link"
              onChange={this.onChangeLink_download}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
