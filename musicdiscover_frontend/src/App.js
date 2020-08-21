import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import HomePage from "./components/home-page.component";
import DownloadForm from "./components/download-form.component";
import Lastfm_page from "./components/lastfm_page.component";
import Twitter_page from "./components/twitter_page.component.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={HomePage} />
        <Route path="/Bandcamp" component={DownloadForm} />
        <Route path="/Lastfm" component={Lastfm_page} />
        <Route path="/Twitter" component={Twitter_page} />
      </div>
    </Router>
  );
}

export default App;
