import run from "./job";

import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";

const scheduler = new ToadScheduler();

const task = new AsyncTask("Add IMDB  watchlist items to QBittorrent", run);

const job = new SimpleIntervalJob({ minutes: 10, runImmediately: true }, task);

console.log("Updating torrents every 10 minutes ✨");

scheduler.addSimpleIntervalJob(job);
