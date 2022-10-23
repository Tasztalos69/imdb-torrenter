// Taken from https://github.com/johannth/imdb-watchlist

import axios from "axios";
import chalk from "chalk";

const fetchIMDBWatchList = async (userId: string) => {
  const res = await axios.get(
    `http://www.imdb.com/user/${userId}/watchlist?view=detail`
  );

  const initialStateRegex = /IMDbReactInitialState\.push\((\{.+\})\);/g;
  const matches = initialStateRegex.exec(res.data);
  if (!matches) {
    console.log(chalk.red("IMDB API Malfunction!"));
    process.exit(1);
  }
  const initialStateText = matches[1];

  const watchlistData = JSON.parse(initialStateText);

  const movieIds = watchlistData.list.items.map((i: any) => i.const);

  return movieIds;
};

export default fetchIMDBWatchList;
