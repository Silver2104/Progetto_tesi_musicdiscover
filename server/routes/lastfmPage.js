const router = require("express").Router(); //Importo il package di routing
const got = require("got"); // Per utilizzare il paradigma REST
const {
  get_top_tracks,
  get_info,
  get_top_albums,
  get_links_photo,
} = require("../functions/lastfm_functions");
//const md5 = require("md5"); MUOVERE NEL PACKAGE lastfmPage_functions.js ------ NON SERVE PIù, eliminare anche il package con npm --------

router.route("/").post((req, res) => {
  let lastfm_onj = {
    tracks: {},
    albums: {},
    info: {},
    links_photo: [],
  };
  asyncRunner(req.body.artist).then((info) => {
    lastfm_onj.tracks = JSON.parse(info.top_tracks);
    lastfm_onj.info = JSON.parse(info.info);
    lastfm_onj.albums = JSON.parse(info.albums);
    lastfm_onj.links_photo = info.links_photo;
    res.send(lastfm_onj);
  });
});

async function asyncRunner(artist) {
  try {
    const top_tracks = await get_top_tracks(artist);
    const info = await get_info(artist);
    const albums = await get_top_albums(artist);
    const links_photo = await get_links_photo(artist);
    console.log("all done");
    return { top_tracks, info, albums, links_photo };
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
