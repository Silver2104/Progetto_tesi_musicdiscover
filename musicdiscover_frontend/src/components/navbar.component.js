import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            MusicDiscover
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Bandcamp">
                Bandcamp
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Lastfm">
                Lastfm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Twitter">
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
