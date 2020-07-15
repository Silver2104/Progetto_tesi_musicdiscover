//IMPORT PACKAGES
const stream = require("stream"); //Per creare stream di download
const { promisify } = require("util"); // Per fare in modo che la pipeline sia eseguita in modo lineare e non parallelo ad altro
const express = require("express"); // Web Framework
const got = require("got"); // Per utilizzare il paradigma REST
const fs = require("fs"); // File System library

//FINE IMPORT PACKAGES

//INIZIALIZZAZIONE PACKAGES
var app = express();
//FINE INIZIALIZZAZIONE PACKAGES

//Costanti di debug ------------- PRENDERE QUESTE VARIABILI FRAMITE FORM NEL FRONT END --------------
const link_html = "https://noveller.bandcamp.com/track/rune";
var dest = "canzone.mp3";
//Fine Costanti di debug

//Costanti

//FINE Costanti

// Routing principale
app.get("/", function (req, res) {
  res.send("Hello World!");
  // Inizio promessa per prendere pagina html
  get_page(link_html)
    //Una volta preso il testo della pagina cerco con le espressioni regolari i link di download
    .then((testo_pagina) => {
      download_canzone(testo_pagina, dest);
    });
});

// Avvio server sulla porta 3000
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

//Funzione per prendere l'html di una pagina
const get_page = (link) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await got(link);
        if (response.body != null) {
          resolve(response.body);
        } else {
          reject(Error("Nessun testo ottenuto dal link"));
        }
        //=> '<!doctype html> ...'
      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
    })();
  });
};

//Funzione download canzone da un link
const download_canzone = (source, dest) => {
  //Creo la pipeline su cui passeranno i bytes
  const pipeline = promisify(stream.pipeline);
  //Creo il pattern per trovare il link di download della canzone ---------------- VEDERE SE DA ANCHE LINK IN CASO DI ALBUM -----------------
  var rePattern = new RegExp(/"mp3\-128":"([^"]*)/);
  //Creo la lista con i risultati
  var arrMatches = source.match(rePattern);
  //Scarico la canzone
  (async () => {
    console.log(arrMatches[1]); //------------- LOG DI CONTROLLO ELIMINARE -----------------
    await pipeline(got.stream(arrMatches[1]), fs.createWriteStream(dest));
  })();
};
