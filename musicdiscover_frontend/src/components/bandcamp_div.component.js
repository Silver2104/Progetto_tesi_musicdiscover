import React, { Component } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import download from "js-file-download";

export class ListaCanzoni extends Component {
  render() {
    return this.props.album.canzoni.map((canzone) => {
      return (
        <Dropdown.Item key={canzone} eventKey={canzone}>
          {canzone}
        </Dropdown.Item>
      );
    });
  }
}

export class Album extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(e) {
    const link_canzone =
      this.props.album.link_album.substring(
        0,
        this.props.album.link_album.indexOf(".com/") + 5
      ) +
      "track/" +
      e.replace(" ", "-");
    console.log(link_canzone);
    axios
      .post(
        "http://localhost:3001/download/track",
        {
          link_song: link_canzone,
        },
        { responseType: "blob" }
      )
      .then((res) => {
        download(res.data, e + ".mp3");
      });
  }
  render() {
    return (
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <img src={this.props.album.foto_album} alt="foto album band"></img>
          <div className="card-body">
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <div className="mb-2">
                  {["up"].map((direction) => (
                    <DropdownButton
                      as={ButtonGroup}
                      key={direction}
                      id={`dropdown-button-drop-${direction}`}
                      drop={direction}
                      variant="secondary"
                      title={` Drop ${direction} `}
                      onSelect={this.onSelect}
                    >
                      <ListaCanzoni album={this.props.album} />
                    </DropdownButton>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Download Album
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class BandcampDiv extends Component {
  exerciseList() {
    return this.props.bandcamp_info.albums.map((currentalbum) => {
      return <Album album={currentalbum} key={currentalbum.nome_album} />;
    });
  }

  render() {
    if (!this.props.bandcamp_info.albums) return null;
    return (
      <div>
        <img src={this.props.bandcamp_info.band_photo} alt="Band" />
        <p>{this.props.bandcamp_info.band_name}</p>
        <p>{this.props.bandcamp_info.band_link}</p>
        <div className="album py-5 bg-light" style={{ fontSize: "16px" }}>
          <div className="container">
            <div className="row">{this.exerciseList()}</div>
          </div>
        </div>
      </div>
    );
  }
}
