import run from "./job";

import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";

const scheduler = new ToadScheduler();

const task = new AsyncTask("Add IMDB  watchlist items to QBittorrent", run);

const job = new SimpleIntervalJob({ minutes: 10 }, task);

scheduler.addSimpleIntervalJob(job);

console.log("Updating torrents every 10 minutes ✨");
