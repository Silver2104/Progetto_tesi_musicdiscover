const router = require("express").Router(); //Importo il package di routing
const { get_tweets } = require("../functions/twitter_functions");

router.route("/").post((req, res) => {
  let twitter_obj = {
    info: {},
  };
  let array_id_tweets = [];
  asyncRunner(req.body.artist).then((info) => {
    twitter_obj.info = JSON.parse(info.info);
    for (let i = 0; i < twitter_obj.info.length; i++) {
      array_id_tweets.push(twitter_obj.info[i].id_str);
    }
    res.send(array_id_tweets);
  });
});

router.route("/getTimeline").post((req, res) => {
  asyncRunner(req.body.artist).then((info) => {
    res.send(JSON.parse(info.info));
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
