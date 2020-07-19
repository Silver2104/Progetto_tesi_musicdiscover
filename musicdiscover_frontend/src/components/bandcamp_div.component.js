import React, { Component } from "react";

const Album = (props) => (
  <tr>
    <td>{props.album.link_album}</td>
    <td>
      <img src={props.album.foto_album} alt="foto album band"></img>
    </td>
    <td>{props.album.nome_album}</td>
  </tr>
);

export default class BandcampDiv extends Component {
  constructor(props) {
    super(props);
  }
  exerciseList() {
    return this.props.bandcamp_info.albums.map((currentalbum) => {
      return <Album album={currentalbum} key={currentalbum.nome_album} />;
    });
  }

  render() {
    if (!this.props.bandcamp_info.albums) return null;
    console.log(this.props);
    return (
      <div>
        <img src={this.props.bandcamp_info.band_photo} />
        <p>{this.props.bandcamp_info.band_name}</p>
        <p>{this.props.bandcamp_info.band_link}</p>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Link</th>
              <th>Immagine</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
