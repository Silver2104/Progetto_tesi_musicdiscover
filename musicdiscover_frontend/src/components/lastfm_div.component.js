import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

export default class LastfmDivMain extends Component {
  constructor(props) {
    super(props);
    this.onSelect_nav = this.onSelect_nav.bind(this);

    this.state = {
      showSongs: true,
      showAlbums: false,
    };
  }
  onSelect_nav(selectedKey) {
    if (selectedKey.toString() === "link-1") {
      this.setState({
        showSongs: true,
        showAlbums: false,
      });
      return;
    } else if (selectedKey.toString() === "link-2") {
      this.setState({
        showSongs: false,
        showAlbums: true,
      });
      return;
    }
  }
  render() {
    return (
      <Container>
        <Jumbotron>
          <Row className="justify-content-md-center">
            <Col xs lg="8">
              <LastfmDivCarousel links_photo={this.props.links_photo} />
            </Col>
          </Row>
        </Jumbotron>
        <Row>
          <Col>
            <LastfmDivBiography biography_text={this.props.biography} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-2">
              <Card.Header>
                <Nav
                  variant="tabs"
                  defaultActiveKey="#first"
                  onSelect={this.onSelect_nav}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">Top Songs</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">Top Albums</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                {this.state.showSongs && (
                  <LastfmDivTopSongs
                    artist_name={this.props.artist_name}
                    songs={this.props.songs}
                  />
                )}
                {this.state.showAlbums && (
                  <LastfmDivTopAlbums
                    artist_name={this.props.artist_name}
                    albums={this.props.albums}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="mb-2">
              <Card.Header>Similar artists</Card.Header>
              <Card.Body>
                <LastfmDivSimilar similars={this.props.similars} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export class LastfmDivSimilar extends Component {
  createsimilarslist() {
    return this.props.similars.map((artist) => {
      return (
        <ListGroup.Item key={artist.name}>
          {artist.name + "  "}

          <Button
            type="button"
            className="btn float-right"
            onClick={() =>
              window.open(
                "https://www.youtube.com/results?search_query=" + artist.name
              )
            }
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              ></path>
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              ></path>
            </svg>
          </Button>
        </ListGroup.Item>
      );
    });
  }
  render() {
    return <ListGroup>{this.createsimilarslist()}</ListGroup>;
  }
}

export class LastfmDivTopSongs extends Component {
  createsongslist() {
    return this.props.songs.map((song) => {
      return (
        <ListGroup.Item key={song.name}>
          {song.name + "  "}

          <Button
            type="button"
            className="btn float-right"
            onClick={() =>
              window.open(
                "https://www.youtube.com/results?search_query=" +
                  this.props.artist_name +
                  " " +
                  song.name,
                "_blank"
              )
            }
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              ></path>
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              ></path>
            </svg>
          </Button>
        </ListGroup.Item>
      );
    });
  }
  render() {
    return <ListGroup>{this.createsongslist()}</ListGroup>;
  }
}

export class LastfmDivTopAlbums extends Component {
  createalbumslist() {
    return this.props.albums.map((album) => {
      return (
        <ListGroup.Item key={album.name}>
          {" "}
          {album.name + "  "}
          <Button
            type="button"
            className="btn float-right"
            onClick={() =>
              window.open(
                "https://www.youtube.com/results?search_query=" +
                  this.props.artist_name +
                  " " +
                  album.name,
                "_blank"
              )
            }
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              ></path>
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              ></path>
            </svg>
          </Button>
        </ListGroup.Item>
      );
    });
  }

  render() {
    return <ListGroup>{this.createalbumslist()}</ListGroup>;
  }
}

export class LastfmDivBiography extends Component {
  render() {
    const text = this.props.biography_text.split("<a")[0];
    return (
      <Jumbotron>
        <h1>Biografia dell'artista</h1>
        <p>{text}</p>
      </Jumbotron>
    );
  }
}

export class LastfmDivCarousel extends Component {
  createCarouselItems() {
    return this.props.links_photo.map((link) => {
      return (
        <Carousel.Item key={link}>
          <img
            className="d-block rounded mx-auto"
            src={link}
            alt="did not load"
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
