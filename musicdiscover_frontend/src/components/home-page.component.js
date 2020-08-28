import React, { Component } from "react";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Benvenuto su MusicDiscover</h1>
        <br />
        <p>
          MusicDiscover è un web application che ha l'obiettivo di far scoprire,
          partendo dai suoi artisti preferiti, nuovi gruppi musicali.
        </p>
        <p>
          I servizi disponibili sono basati sulle API dei siti Lastfm e Twitter,
          inoltre grazie al sito Bandcamp è possibile fare il download delle
          canzoni disponibili sulla piattaforma dell'artista richiesto.{" "}
        </p>
      </div>
    );
  }
}
