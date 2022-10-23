export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      INTERVAL: string;

      IMDB_USER_ID: string;

      NCORE_USERNAME: string;
      NCORE_PASSWORD: string;

      QBITTORRENT_URL: string;
      QBITTORRENT_USERNAME: string;
      QBITTORRENT_PASSWORD: string;
    }
  }
}
