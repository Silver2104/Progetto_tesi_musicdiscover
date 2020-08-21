const router = require("express").Router(); //Importo il package di routing

router.route("/").post((req, res) => {
  console.log(req.body.artist);
  let twitter_obj = {
    testo: req.body.artist,
  };
  res.send(twitter_obj);
});

module.exports = router;
