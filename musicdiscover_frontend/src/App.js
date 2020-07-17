import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import HomePage from "./components/home-page.component";
import DownloadForm from "./components/download-form.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={HomePage} />
      <Route path="/download" component={DownloadForm} />
    </Router>
  );
}

export default App;
