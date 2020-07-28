const got = require("got"); // Per utilizzare il paradigma REST

function get_top_tracks(artist) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await got(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=${artist}&limit=5&api_key=53b679c0a1ca7d707ac8682fc328fbe4&format=json`
        );
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

function get_top_albums(artist) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await got(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${artist}&limit=5&api_key=53b679c0a1ca7d707ac8682fc328fbe4&format=json`
        );
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

function get_info(artist) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await got(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${artist}&api_key=53b679c0a1ca7d707ac8682fc328fbe4&format=json`
        );
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

function get_links_photo(artist) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let links_photo = [];
        const response = await got(
          `https://www.last.fm/music/${artist}/+images`
        );
        var pattern_foto = new RegExp(/item">\s*<img\s*src="(.*)"/, "g");
        const match_results = response.body.matchAll(pattern_foto);
        for (const match of match_results) {
          if (links_photo.length == 5) {
            break;
          }
          links_photo.push(match[1].replace("avatar170s", "770x0"));
        }
        if (response != null) {
          resolve(links_photo);
        } else {
          reject(Error("Nessun testo ottenuto dal link"));
        }
      } catch (error) {
        console.log("ERRORE IN lastfm_functions -> get_links_photo");
      }
    })();
  });
}

module.exports = { get_top_tracks, get_info, get_top_albums, get_links_photo };
