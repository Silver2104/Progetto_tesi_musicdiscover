const got = require("got"); // Per utilizzare il paradigma REST
const keys = require("./keys");

function get_tweets(account_name) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${keys.TWITTER_BEARER_TOKEN}`,
          },
        };
        const response = await got(
          `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${account_name}&count=5`,
          options
        );
        console.log(response.body);
        if (response != null) {
          resolve(response.body);
        } else {
          reject(Error("Nessun testo ottenuto dal link"));
        }
      } catch (error) {
        console.log(error.response.body);
      }
    })();
  });
}

module.exports = { get_tweets };
