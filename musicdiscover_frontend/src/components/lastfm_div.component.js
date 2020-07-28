import React, { Component } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

export default class LastfmDiv extends Component {
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
    console.log(this.props);
    return <Carousel>{this.createCarouselItems()}</Carousel>;
  }
}
