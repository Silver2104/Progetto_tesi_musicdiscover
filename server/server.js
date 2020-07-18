//IMPORT PACKAGES
const cors = require("cors"); //Per settare il cros origin resource sharing
require("dotenv").config(); // per avere tutte le variabili d'ambiente in un unico file nel progetto e non nel sistema
const express = require("express"); // Web Framework

//FINE IMPORT PACKAGES

//INIZIALIZZAZIONE PACKAGES
var app = express();
app.use(cors());
app.use(express.json());
//FINE INIZIALIZZAZIONE PACKAGES

//Inizializzazione routes
const downloadPage = require("./routes/downloadPage");
//Fine //Inizializzazione routes

// Routing principale
app.get("/", function (req, res) {
  res.send("Hello World!");
});

//Routes secondari
app.use("/download", downloadPage);
//Fine routes secondari

// Avvio server sulla porta 3001
app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
