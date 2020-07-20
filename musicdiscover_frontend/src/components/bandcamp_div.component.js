import React, { Component } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";

const Album = (props) => (
  <div className="col-md-4">
    <div className="card mb-4 shadow-sm">
      <img src={props.album.foto_album} alt="foto album band"></img>
      <div className="card-body">
        <p className="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
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
                >
                  <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    Something else here
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
              ))}
            </div>
            {/*METTERE DENTRO IL BUTTONGROUP*/}
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  /*
  <tr>
    <td>{props.album.link_album}</td>
    <td>
      <img src={props.album.foto_album} alt="foto album band"></img>
    </td>
    <td>{props.album.nome_album}</td>
  </tr>
  */
);

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

/*
<div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className="card-body">
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
*/
