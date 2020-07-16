const router = require("express").Router(); //Importo il package di routing
const got = require("got"); // Per utilizzare il paradigma REST
const fs = require("fs"); // File System library
const { promisify } = require("util"); // Per fare in modo che la pipeline sia eseguita in modo lineare e non parallelo ad altro
const stream = require("stream"); //Per creare stream di download

//Costanti di debug ------------- PRENDERE QUESTE VARIABILI FRAMITE FORM NEL FRONT END --------------
const link_html = "https://noveller.bandcamp.com/track/rune";
var dest = "canzone.mp3";
//Fine Costanti di debug

router.route("/").get((req, res) => {
  res.send("sto nella pagina download");
  // Inizio promessa per prendere pagina html
  get_page(link_html)
    //Una volta preso il testo della pagina cerco con le espressioni regolari i link di download
    .then((testo_pagina) => {
      download_canzone(testo_pagina, dest);
    });
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

//rendo disponibile la pagina come un package
module.exports = router;
