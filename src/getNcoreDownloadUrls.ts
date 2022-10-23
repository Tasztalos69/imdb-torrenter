import chalk from "chalk";
import createNcoreApi from "ncore-api";

const getNcoreDownloadUrls = async (
  username: string,
  password: string,
  movieIds: string[]
) => {
  const ncoreApi = await createNcoreApi({
    url: "https://ncore.pro",
    username,
    password,
  });

  let ncoreIds = await Promise.all(
    movieIds.map(async (id: string) => {
      const IMDBTorrent = await ncoreApi.getMovieByImdb(id);

      if (IMDBTorrent.quality === "fhd") {
        return IMDBTorrent.id;
      } else {
        const fhdTorrent = IMDBTorrent.versions.filter(
          (v: any) => v.quality === "fhd"
        )[0];
        if (!fhdTorrent) {
          console.log(chalk.yellow(`Torrent not found for ${id}, skipping.`));
        } else {
          return fhdTorrent.id;
        }
      }
    })
  );

  ncoreIds = ncoreIds.filter(Boolean);

  const downloadUrls = await Promise.all(
    ncoreIds.map(async (id: string) => {
      if (id) {
        const movieTorrent = await ncoreApi.getMovie(id);
        return movieTorrent.downloadUrl;
      }
    })
  );

  return downloadUrls;
};

export default getNcoreDownloadUrls;
