const got = require("got"); // Per utilizzare il paradigma REST
//Funzione promessa che prende le canzoni degli album della band
const bancamp_album_getsongs = (info) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        console.log("SONO IN bancamp_album_getsongs");
        for (const album of info.albums) {
          console.log(album);
          //var canzoni = [];
          console.log("SONO PRIMA DELLA CHIAMATA AL SITO BANDCAMP");
          const response = await got(album.link_album.replace(/\s/gi, ""));
          console.log("SONO DOPO LA CHIAMATA AL SITO BANDCAMP");
          var PatternSongs = new RegExp(/itemprop="name">(.+)<\/s/, "g");
          var arraySongs = response.body.matchAll(PatternSongs);
          console.log("SONO PRIMA DEL CICLO FOR");
          for (const canzone of arraySongs) {
            console.log("SONO NEL CICLO FOR");
            album.canzoni.push(canzone[1]);
          }
          console.log("SONO USCITO DAL CICLO FOR");
        }
        if (info != null) {
          console.log("SONO USCITO DA bancamp_album_getsongs");
          resolve(info);
        } else {
          reject(Error("It broke"));
        }
      } catch (error) {
        console.log("ERRORE IN bancamp_album_getsongs");
        //=> 'Internal server error ...'
      }
    })();
  });
};

//Funzione promessa che prende il link della band
const bandcamp_getlinkBand = (info, testo_pagina) => {
  return new Promise((resolve, reject) => {
    console.log("STO IN BANDCAMP_GETLINKBAND");
    //Cerco il link per la pagina della band e lo metto dentro info
    var rePattern1 = new RegExp(/"byArtist">\s+<a href="(.*)"/);
    var arrMatches1 = testo_pagina.match(rePattern1);
    var rePattern2 = new RegExp(/band-name.*\s*.*"title">(.*)<\/span>/);
    var arrMatches2 = testo_pagina.match(rePattern2);
    if (arrMatches1 != null) {
      console.log(arrMatches1[1]);
      info.band_link = arrMatches1[1];
      console.log(info.band_link);
      if (info.band_link != null) {
        console.log("SONO USCITO DA BANDCAMP_GETLINKBAND");
        resolve(info);
      } else {
        reject(
          Error(
            "Non sono riuscito a mettere il link della band dentro ad info (Funzione bandcamp_getlinkBand)"
          )
        );
      }
    } else {
      console.log(arrMatches2[1]);
      info.band_link = "https://" + arrMatches2[1] + ".bandcamp.com/";
      console.log(info.band_link);
      if (info.band_link != null) {
        console.log("SONO USCITO DA BANDCAMP_GETLINKBAND");
        resolve(info);
      } else {
        reject(
          Error(
            "Non sono riuscito a mettere il link della band dentro ad info (Funzione bandcamp_getlinkBand)"
          )
        );
      }
    }
  });
};

//Funzione promessa che prende il link della foto e il nome della band
const bandcamp_getBandPhotoandName = (info) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        console.log("SONO IN bandcamp_getBandPhotoandName");
        let oggetto_composto = {
          info_oggetto_composto: {},
          response_oggetto_composto: {},
        };
        //faccio una get alla pagina della band per prendere le informazioni
        const response = await got(info.band_link);
        //Cerco il link per la foto della band e il nome della band e li metto dentro il json
        var pattern_foto = new RegExp(
          /<img src="(.*)"\s+class="band-photo" alt="(.*) image/
        );
        const link_foto_band = response.body.match(pattern_foto);
        info.band_photo = link_foto_band[1];
        info.band_name = link_foto_band[2];

        oggetto_composto.info_oggetto_composto = info;
        oggetto_composto.response = response;
        if (info.band_photo != null && info.band_name != null) {
          console.log("SONO USCITO DA bandcamp_getBandPhotoandName");
          resolve(oggetto_composto);
        } else {
          reject(
            Error(
              "Non sono riuscito a mettere il link della foto della band e il nome dentro ad info (Funzione bandcamp_getBandPhotoandName)"
            )
          );
        }
      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
    })();
  });
};
//Funzione promessa che prende le informazioni degli album della band
const bandcamp_getBandAlbumsinfo = (info, response) => {
  return new Promise((resolve, reject) => {
    console.log("SONO IN bandcamp_getBandAlbumsinfo");
    //Cerco informazioni albums
    var pattern_link_album = new RegExp(
      /<a href="(\/album.+)".*\s*.*\s*.*src="(.*)\salt.*\s*.*\s*.*\s*(.*)/,
      "g"
    );
    const link_album = response.body.matchAll(pattern_link_album);
    for (const match of link_album) {
      let album = {
        link_album: "",
        foto_album: "",
        nome_album: "",
        canzoni: [],
      };
      //CODICE PER PRENDERE IL LINK DELLA PAGINA DELL'ALBUM
      const stringa_link_album = info.band_link + match[1];
      //FINE CODICE PER PRENDERE IL LINK DELLA PAGINA DELL'ALBUM
      //CODICE PER PRENDERE IL LINK DELLA FOTO DELL'ALBUM
      let stringa = "";
      if (match[2].includes("data-original")) {
        stringa = match[2].substring(
          match[2].indexOf("data-original") + 15,
          match[2].length - 1
        );
      } else {
        stringa = match[2];
      }
      //FINE CODICE PER PRENDERE IL LINK DELLA FOTO DELL'ALBUM
      album.link_album = stringa_link_album;
      album.foto_album = stringa;
      album.nome_album = match[3];
      info.albums.push(album);
    }

    if (info != null) {
      console.log("SONO USCITO DA bandcamp_getBandAlbumsinfo");
      resolve(info);
    } else {
      reject(Error("It broke"));
    }
  });
};

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
        bandcamp_getlinkBand(info, testo_pagina).then((info) => {
          bandcamp_getBandPhotoandName(info).then((oggetto_composto) => {
            bandcamp_getBandAlbumsinfo(
              oggetto_composto.info_oggetto_composto,
              oggetto_composto.response
            ).then((info) => {
              bancamp_album_getsongs(info).then((info) => {
                if (info != null) {
                  console.log("STO IN bandcamp_getinfo");
                  console.log(info);
                  resolve(info);
                } else {
                  reject(Error("It broke"));
                }
              });
            });
          });
        });
      } catch (error) {
        console.log("ERRORE IN bandcamp_getinfo");
        //=> 'Internal server error ...'
      }
    })();
  });
};

module.exports = { bandcamp_getinfo };
