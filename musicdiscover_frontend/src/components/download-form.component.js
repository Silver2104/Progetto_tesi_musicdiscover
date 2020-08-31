import React, { Component } from "react";
import axios from "axios";
import BandcampDiv from "./bandcamp_div.component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default class BandCampPage extends Component {
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
    console.log(this.state.link_download);
    const link = {
      download_link:
        "https://" + this.state.link_download + ".bandcamp.com/album/",
    };
    console.log(link.download_link);
    axios
      .post("http://localhost:3001/download/", link)
      .then((res) => {
        this.setState({
          bandcamp_info: res.data,
        });
        this.hideComponent();
        this.setState({
          download_link: "",
        });
      })
      .catch(function (error) {
        console.log(
          "Errore nella funzione onSubmit nella pagina bandcamp: " + error
        );
      });
  }

  render() {
    const { isShowBandcampDiv } = this.state;
    console.log(this.state.bandcamp_info);
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Form onSubmit={this.onSubmit}>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Link bandcamp
                  </Form.Label>
                  <Form.Control
                    required
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Nome artista"
                    onChange={this.onChangeLink_download}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="mb-2">
                    Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="div_bandcamp_info">
              {isShowBandcampDiv && (
                <BandcampDiv bandcamp_info={this.state.bandcamp_info} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
