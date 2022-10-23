import chalk from "chalk";
import dotenv from "dotenv-flow";

dotenv.config({ silent: true });

const {
  INTERVAL,
  IMDB_USER_ID,
  NCORE_USERNAME,
  NCORE_PASSWORD,
  QBITTORRENT_URL,
  QBITTORRENT_USERNAME,
  QBITTORRENT_PASSWORD,
} = process.env;

const vars = [
  INTERVAL,
  IMDB_USER_ID,
  NCORE_USERNAME,
  NCORE_PASSWORD,
  QBITTORRENT_URL,
  QBITTORRENT_USERNAME,
  QBITTORRENT_PASSWORD,
];

const requireENV = () => {
  if (!vars.every(Boolean)) {
    console.log(chalk.red("Please provide all ENV Vars."));
    process.exit(1);
  }
};

export default requireENV;
