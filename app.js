var express = require("express");
var request = require("request");
var app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
  const pagina_html = get_page();
  console.log(pagina_html);
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

function get_page() {
  request("http://www.google.com", function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
  });
}
