import React, { Component } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import TweetEmbed from "react-tweet-embed";

export default class TwitterDivMain extends Component {
  render() {
    return (
      <div>
        <TweetEmbed id="1296290537780080640" />
      </div>
    );
  }
}
