import React, { Component } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class TwitterDivMain extends Component {
  createTweetsElements() {
    return this.props.ids.map((id) => {
      return <TwitterTweetEmbed tweetId={id} key={id} />;
    });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="7">
            {this.createTweetsElements()}
          </Col>
        </Row>
      </Container>
    );
  }
}
