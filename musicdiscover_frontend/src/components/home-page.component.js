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
        <p>
          La prima pagina si occupa del servizio di download delle canzoni. È
          necessario solamente mettere nel campo della form il nome dell'artista
          e la pagina caricherà automaticamente gli album dell'artista che sono
          disponibili sul sito Bandcamp, se l'artista non ha una pagina su
          Bandcamp il servizio non funzionerà. Inoltre cliccando sul bottone
          "Songs" comprarirà un menù a tendina in cui ci sarà l'elenco delle
          canzoni nell'album, cliccando sul nome di una canzone dopo pochi
          secondo si avvierà il download della canzone scelta.
        </p>
        <p>
          La seconda pagina offre il servizio di ricerca dei top brani, top
          album e artisti simili rispetto ad un artista scelto. Inoltre fornisce
          anche uno slideshow delle foto dell'artista e una descrizione riguardo
          la sua carriera musicale.
        </p>
        <p>
          L'ultima pagina si interfaccia con l'account di twitter dell'artista e
          rende disponibile la visione degli ultimi tweet dell'artista.
        </p>
      </div>
    );
  }
}
