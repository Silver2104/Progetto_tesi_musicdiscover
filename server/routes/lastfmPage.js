const router = require("express").Router(); //Importo il package di routing
const {
  get_top_tracks,
  get_info,
  get_top_albums,
  get_links_photo,
} = require("../functions/lastfm_functions");

router.route("/").post((req, res) => {
  let lastfm_obj = {
    tracks: {},
    albums: {},
    info: {},
    links_photo: [],
  };
  asyncRunner(req.body.artist).then((info) => {
    lastfm_obj.tracks = JSON.parse(info.top_tracks);
    lastfm_obj.info = JSON.parse(info.info);
    lastfm_obj.albums = JSON.parse(info.albums);
    lastfm_obj.links_photo = info.links_photo;
    res.send(lastfm_obj);
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
