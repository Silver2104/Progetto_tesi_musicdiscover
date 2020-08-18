import React, { Component } from "react";
import axios from "axios";
import LastfmDivMain from "./lastfm_div.component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default class Lastfm_Page extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLink_lastfm = this.onChangeLink_lastfm.bind(this);

    this.state = {
      artist_lastfm: "",
      lastfm_info: {},
      isShowLastfmDiv: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const link = {
      artist: this.state.artist_lastfm,
    };
    console.log(link);
    axios.post("http://localhost:3001/lastfm/", link).then((res) => {
      this.setState({
        lastfm_info: res.data,
      });
      this.hideComponent();
    });
  }
  hideComponent() {
    this.setState({ isShowLastfmDiv: !this.state.isShowLastfmDiv });
  }
  onChangeLink_lastfm(e) {
    this.setState({
      artist_lastfm: e.target.value,
    });
  }

  render() {
    const { isShowLastfmDiv } = this.state;
    console.log(this.state.lastfm_info);
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Form onSubmit={this.onSubmit}>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Name
                  </Form.Label>
                  <Form.Control
                    required
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Nome autore"
                    onChange={this.onChangeLink_lastfm}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="mb-2">
                    Submit
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="div_lastfm_info">
              {isShowLastfmDiv && (
                <LastfmDivMain
                  links_photo={this.state.lastfm_info.links_photo}
                  biography={this.state.lastfm_info.info.artist.bio.content}
                  songs={this.state.lastfm_info.tracks.toptracks.track}
                  albums={this.state.lastfm_info.albums.topalbums.album}
                  similars={this.state.lastfm_info.info.artist.similar.artist}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
