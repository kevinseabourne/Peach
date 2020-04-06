import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://c24654f05f8f4e8b9ceedda126a1c9d7@o218772.ingest.sentry.io/5191179"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
