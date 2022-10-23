/* Resources:
    - https://www.npmjs.com/package/ncore-api
    - https://github.com/szabbenjamin/nCoreDownloader
*/

import axios from "axios";
import chalk from "chalk";

const { NCORE_USERNAME, NCORE_PASSWORD } = process.env;

export const ncoreLogin = async (username: string, password: string) => {
  const { data } = await axios.post("https://ncore.pro/login.php", {
    form: {
      set_lang: "hu",
      submitted: 1,
      nev: username,
      pass: password,
      submit: "Belépés!",
    },
  });

  if ((data as string).includes("hibauzenet")) {
    console.log(chalk.red("NCore login error!"));
    process.exit(1);
  }
};

const fetchNcoreTorrentURLs = async (ids: string[]) => {
  return ids.map(async (id) => {
    const { data } = await axios.post("https://ncore.pro/torrents.php", {
      form: {
        mire: id,
        miben: "imdb",
        tipus: "all_own",
        "submit.x": 0,
        "submit.y": 0,
        submit: "Ok",
        tags: "",
      },
    });
    console.log(data);
  });
};

export default fetchNcoreTorrentURLs;

// request.post(
//   "https://ncore.cc/torrents.php",
//   {
//     form: {
//       mire: search.trim(),
//       miben: "name",
//       tipus: "all_own",
//       "submit.x": 0,
//       "submit.y": 0,
//       submit: "Ok",
//       tags: "",
//     },
//   },
//   function (error, response, body) {
//     if (self.key === "") {
//       let downloadUrl = $(body).closest('link[rel="alternate"]').attr("href");
//       self.key = decodeURIComponent(
//         downloadUrl.match(/(\?|&)key\=([^&]*)/)[2]
//       );
//     }

//     $(body)
//       .find(".torrent_konyvjelzo")
//       .each(function () {
//         var numb = $(this).attr("onclick").match(/\d/g);
//         var id = numb.join("");
//         elements.push(id);
//       });
//     $(body)
//       .find(".torrent_konyvjelzo2")
//       .each(function () {
//         var numb = $(this).attr("onclick").match(/\d/g);
//         var id = numb.join("");
//         elements.push(id);
//       });
//     log('Keres: "' + search.trim() + '", ' + elements.length + " db találat");
//     cb(elements);
//   }
// );
