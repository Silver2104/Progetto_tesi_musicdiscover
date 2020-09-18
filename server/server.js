//IMPORT PACKAGES
const cors = require("cors"); //Per settare il cros origin resource sharing
require("dotenv").config(); // per avere tutte le variabili d'ambiente in un unico file nel progetto e non nel sistema
const express = require("express"); // Web Framework
const { PromisableRequest } = require("got/dist/source");
//FINE IMPORT PACKAGES

//INIZIALIZZAZIONE PACKAGES
var app = express();
app.use(cors());
app.use(express.json());
//FINE INIZIALIZZAZIONE PACKAGES

//Inizializzazione routes
const downloadPage = require("./routes/downloadPage");
const LastfmPage = require("./routes/lastfmPage");
const TwitterPage = require("./routes/TwitterPage");
//Fine //Inizializzazione routes

// Routing principale
app.get("/", function (req, res) {
  res.send("Hello World!");
});

//Routes secondari
app.use("/download", downloadPage);
app.use("/lastfm", LastfmPage);
app.use("/twitter", TwitterPage);
//Fine routes secondari
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
// Avvio server sulla porta 3001
const port = 3001;
app.listen(port, function () {
  console.log(port);
});
