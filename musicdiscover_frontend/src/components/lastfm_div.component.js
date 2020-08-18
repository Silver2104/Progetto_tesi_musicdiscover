import React, { Component } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class LastfmDivMain extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="8">
            <LastfmDivCarousel links_photo={this.props.links_photo} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LastfmDivBiography biography_text={this.props.biography} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LastfmDivTopSongs songs={this.props.songs} />
          </Col>
          <Col>
            <LastfmDivTopAlbums albums={this.props.albums} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LastfmDivSimilar similars={this.props.similars} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export class LastfmDivSimilar extends Component {
  createsimilarslist() {
    return this.props.similars.map((artist) => {
      return artist.name;
    });
  }
  render() {
    const array_artisti = this.createsimilarslist();
    return (
      <Jumbotron>
        <h1>Artisti simili</h1>
        <br />
        <p>{array_artisti.toString()}</p>
      </Jumbotron>
    );
  }
}

export class LastfmDivTopSongs extends Component {
  createsongslist() {
    return this.props.songs.map((song) => {
      return <p>- {song.name}</p>;
    });
  }
  render() {
    console.log(this.props.songs);
    return (
      <Jumbotron>
        <h1>Top Songs</h1>
        <br />
        {this.createsongslist()}
      </Jumbotron>
    );
  }
}

export class LastfmDivTopAlbums extends Component {
  createalbumslist() {
    return this.props.albums.map((album) => {
      return <p>- {album.name}</p>;
    });
  }

  render() {
    return (
      <Jumbotron>
        <h1>Top Albums</h1>
        <br />
        {this.createalbumslist()}
      </Jumbotron>
    );
  }
}

export class LastfmDivBiography extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const text = this.props.biography_text.split("<a")[0];
    console.log(this.props.biography_text.indexOf("<a"));
    return (
      <Jumbotron>
        <h1>Biografia dell'artista</h1>
        <p>{text}</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    );
  }
}

export class LastfmDivCarousel extends Component {
  constructor(props) {
    super(props);
  }
  createCarouselItems() {
    return this.props.links_photo.map((link) => {
      return (
        <Carousel.Item key={link}>
          <img
            className="d-block rounded mx-auto"
            src={link}
            alt="First slide"
            width="640"
            height="420"
          />
        </Carousel.Item>
      );
    });
  }

  render() {
    return <Carousel>{this.createCarouselItems()}</Carousel>;
  }
}
