import dotenv from "dotenv-flow";
import chalk from "chalk";
import fetchIMDBWatchList from "./fetchIMDBWatchlist";
import requireENV from "./requireENV";
import getNcoreDownloadUrls from "./getNcoreDownloadUrls";
import { qBittorrentClient } from "@robertklep/qbittorrent";
import type { TorrentAddParameters } from "@robertklep/qbittorrent";

dotenv.config({ silent: true });

const run = async () => {
  try {
    // Check for all required ENV variables
    requireENV();
    const {
      IMDB_USER_ID,
      NCORE_USERNAME,
      NCORE_PASSWORD,
      QBITTORRENT_URL,
      QBITTORRENT_USERNAME,
      QBITTORRENT_PASSWORD,
    } = process.env;

    // Fetch IMDB Movie IDs
    const movieIds = await fetchIMDBWatchList(IMDB_USER_ID!);

    // Fetch torrent file URLs
    const downloadUrls = await getNcoreDownloadUrls(
      NCORE_USERNAME,
      NCORE_PASSWORD,
      movieIds
    );

    // Add torrents to client
    const client = new qBittorrentClient(
      QBITTORRENT_URL,
      QBITTORRENT_USERNAME,
      QBITTORRENT_PASSWORD
    );

    await client.torrents.add({ urls: downloadUrls, category: "Movie" });
  } catch (err) {
    console.error(err);
    console.log(chalk.red("Error during operation!"));
    process.exit(1);
  }
};

export default run;
