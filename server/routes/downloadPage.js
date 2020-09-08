const router = require("express").Router(); //Importo il package di routing
const got = require("got"); // Per utilizzare il paradigma REST
const fs = require("fs"); // File System library
const { promisify } = require("util"); // Per fare in modo che la pipeline sia eseguita in modo lineare e non parallelo ad altro
const stream = require("stream"); //Per creare stream di download
const { bandcamp_getinfo } = require("../functions/bandcamp_functions");

//Costanti di debug ------------- PRENDERE QUESTE VARIABILI FRAMITE FORM NEL FRONT END --------------
const dest = "canzone.mp3";
//Fine Costanti di debug

router.route("/").post((req, res) => {
  get_page(req.body.download_link)
    //Una volta preso il testo della pagina cerco con le espressioni regolari i link di download
    .then((testo_pagina) => {
      const info_bandcamp = bandcamp_getinfo(testo_pagina).then(
        (info_bandcamp) => {
          console.log(info_bandcamp);
          res.send(info_bandcamp);
        }
      );
    });
});
router.route("/").get((req, res) => {
  get_page(req.query.download_link)
    //Una volta preso il testo della pagina cerco con le espressioni regolari i link di download
    .then((testo_pagina) => {
      const info_bandcamp = bandcamp_getinfo(testo_pagina).then(
        (info_bandcamp) => {
          console.log(info_bandcamp);
          res.send(info_bandcamp);
        }
      );
    });
});

router.route("/track").post((req, res) => {
  get_page(req.body.link_song).then((testo_pagina) => {
    download_canzone(testo_pagina, dest).then((stringa) => {
      res.download(
        "C:\\Users\\Silver\\Desktop\\Stefano\\Università\\Tesi\\Progetto_tesi_musicdiscover\\canzone.mp3"
      );
    });
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
        console.log("Errore in get_page nell'API /download");
        //=> 'Internal server error ...'
      }
    })();
  });
};

//Funzione download canzone da un link
const download_canzone = (source, dest) => {
  return new Promise((resolve, reject) => {
    //Creo la pipeline su cui passeranno i bytes
    const pipeline = promisify(stream.pipeline);
    //Creo il pattern per trovare il link di download della canzone ---------------- VEDERE SE DA ANCHE LINK IN CASO DI ALBUM -----------------
    var rePattern = new RegExp(/"mp3\-128":"([^"]*)/);
    //Creo la lista con i risultati
    var arrMatches = source.match(rePattern);
    //Scarico la canzone
    (async () => {
      await pipeline(got.stream(arrMatches[1]), fs.createWriteStream(dest));
      if (true) {
        resolve("download avvenuto con successo");
      } else {
        reject(Error("Nessun testo ottenuto dal link"));
      }
    })();
  });
};

//rendo disponibile la pagina come un package
module.exports = router;
