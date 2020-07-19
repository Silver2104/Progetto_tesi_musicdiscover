const got = require("got"); // Per utilizzare il paradigma REST

const bandcamp_getinfo = (testo_pagina) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // Creo contenitore per le informazioni
        let info = {
          band_name: "",
          band_link: "",
          band_photo: "",
          albums: [],
        };

        //Cerco il link per la pagina della band e lo metto dentro info
        var rePattern = new RegExp(/"byArtist">\s+<a href="(.*)"/);
        var arrMatches = testo_pagina.match(rePattern);
        info.band_link = arrMatches[1];
        //faccio una get alla pagina della band per prendere le informazioni
        const response = await got(info.band_link);
        //Cerco il link per la foto della band e il nome della band e li metto dentro il json
        var pattern_foto = new RegExp(
          /<img src="(.*)"\s+class="band-photo" alt="(.*) image/
        );
        const link_foto_band = response.body.match(pattern_foto);
        info.band_photo = link_foto_band[1];
        info.band_name = link_foto_band[2];
        //Cerco informazioni albums
        var pattern_link_album = new RegExp(
          /<a href="(\/album.+)".*\s*.*\s*.*src="(.*)\salt.*\s*.*\s*.*\s*(.*)/,
          "g"
        );
        const link_album = response.body.matchAll(pattern_link_album);
        for (const match of link_album) {
          const album = {
            //https://noveller.bandcamp.com/album/the-thing
            link_album:
              "https://" + info.band_name + ".bandcamp.com" + match[1],
            foto_album: match[2],
            nome_album: match[3],
          };
          //Aggiungo informazioni nell'array album di info
          info.albums.push(album);
        }
        //Ritorno il contenitore con le informazioni
        if (info != null) {
          resolve(info);
        } else {
          reject(Error("It broke"));
        }
      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
    })();
  });
};

module.exports = { bandcamp_getinfo };

//<img src="(.*)"\s+class="band-photo" alt="(.*) image  FOTO BAND + NOME BAND
//<a href="(\/album.+)".*\s*.*\s*.*src="(.*)\salt.*\s*.*\s*.*\s*(.*) LINK ALBUM + FOTO ALBUM + NOME
