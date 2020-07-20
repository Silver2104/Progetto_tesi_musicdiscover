import React, { Component } from "react";
import axios from "axios";
import BandcampDiv from "./bandcamp_div.component";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.onChangeLink_download = this.onChangeLink_download.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideComponent = this.hideComponent.bind(this);

    this.state = {
      link_download: "",
      bandcamp_info: {},
      isShowBandcampDiv: false,
    };
  }

  onChangeLink_download(e) {
    this.setState({
      link_download: e.target.value,
    });
  }

  hideComponent() {
    this.setState({ isShowBandcampDiv: !this.state.isShowBandcampDiv });
  }

  onSubmit(e) {
    e.preventDefault();
    const link = {
      download_link: this.state.link_download,
    };

    console.log(this.state.link_download);

    axios.post("http://localhost:3001/download/", link).then((res) => {
      console.log(res.data);
      this.setState({
        bandcamp_info: res.data,
      });
    });

    this.setState({
      download_link: "",
    });
  }

  render() {
    const { isShowBandcampDiv } = this.state;
    return (
      <div>
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
        <div id="div_bandcamp_info">
          <button onClick={() => this.hideComponent()}>
            Show bandcamp information
          </button>
          {isShowBandcampDiv && (
            <BandcampDiv bandcamp_info={this.state.bandcamp_info} />
          )}
        </div>
      </div>
    );
  }
}
