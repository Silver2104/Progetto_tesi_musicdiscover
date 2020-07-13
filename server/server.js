var express = require("express"); // Web Framework
var request = require("request"); // Web Scraper
var app = express(); // Inizializzazione express

// Routing principale
app.get("/", function (req, res) {
  res.send("Hello World!");
  //Chiamata alla funzione get_page che prende l'html di una pagina
  const pagina_html = get_page();
  console.log(pagina_html);
});

// Avvio server sulla porta 3000
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

//Funzione per prendere l'html di una pagina
function get_page() {
  request("http://www.google.com", function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
  });
}
