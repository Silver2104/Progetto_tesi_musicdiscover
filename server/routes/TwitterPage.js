const router = require("express").Router(); //Importo il package di routing
const { get_tweets } = require("../functions/twitter_functions");

router.route("/").post((req, res) => {
  let twitter_obj = {
    info: {},
  };
  asyncRunner(req.body.artist).then((info) => {
    twitter_obj.info = JSON.parse(info.info);
    res.send(twitter_obj);
  });
});

async function asyncRunner(artist) {
  try {
    const info = await get_tweets(artist);
    console.log("all done");
    return { info };
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
