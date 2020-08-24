import React, { Component } from "react";
import axios from "axios";
import TwitterDivMain from "./twitter_div.component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default class Twitter_page extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLink_Twitter = this.onChangeLink_Twitter.bind(this);

    this.state = {
      twitter_account: "",
      twitter_info: [],
      isShowTwitterDiv: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const link = {
      artist: this.state.twitter_account,
    };
    axios.post("http://localhost:3001/twitter/", link).then((res) => {
      console.log(res.data);
      this.setState({
        twitter_info: res.data,
      });
      this.hideComponent();
    });
  }

  hideComponent() {
    this.setState({ isShowTwitterDiv: !this.state.isShowTwitterDiv });
  }

  onChangeLink_Twitter(e) {
    this.setState({
      twitter_account: e.target.value,
    });
  }

  render() {
    const { isShowTwitterDiv } = this.state;
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
                    onChange={this.onChangeLink_Twitter}
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
              {isShowTwitterDiv && (
                <TwitterDivMain ids={this.state.twitter_info} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
