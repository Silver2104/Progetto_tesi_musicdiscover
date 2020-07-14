//IMPORT PACKAGES
var express = require("express"); // Web Framework
var request = require("request"); // Web Scraper
//FINE IMPORT PACKAGES

//INIZIALIZZAZIONE PACKAGES
var app = express();
//FINE INIZIALIZZAZIONE PACKAGES

// Costanti di debug ------------- PRENDERE QUESTE VARIABILI FRAMITE FORM NEL FRONT END --------------
const link_html = "https://noveller.bandcamp.com/track/rune";

// Routing principale
app.get("/", function (req, res) {
  res.send("Hello World!");
  //--------------- SEPARARE IL ROUTING DALLA CASCATA DI FUNZIONI ? --------------
  // Inizio promessa per prendere pagina html
  get_page(link_html)
    //Una volta preso il testo della pagina cerco con le espressioni regolari i link di download
    .then((testo_pagina) => {
      var rePattern = new RegExp(/"mp3\-128":"([^"]*)/);
      var arrMatches = testo_pagina.match(rePattern);
      console.log(arrMatches[1]);
    });
  //--------------- SEPARARE IL ROUTING DALLA CASCATA DI FUNZIONI ? --------------
});

// Avvio server sulla porta 3000
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

//Funzione per prendere l'html di una pagina
const get_page = (link) => {
  return new Promise((resolve, reject) => {
    const testo_pagina = request(link, function (error, response, body) {
      console.error("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      if (body != "") {
        resolve(body);
      } else {
        reject(Error("Nessun testo ottenuto dal link"));
      }
    });
  });
};
