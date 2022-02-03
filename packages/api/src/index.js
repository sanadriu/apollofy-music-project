const { app } = require("./server");
const { config, mode } = require("./config");
const { connect, seed } = require("./db");

if (!config.app.port) {
  throw new Error("App config is invalid");
}

console.log(`Environment mode: ${mode}`);

connect()
  .then(() => {
    // return seed();
    return Promise.resolve();
  })
  .then(() => {
    app.listen(config.app.port, () => {
      console.log(`Server listening on ${config.app.port}`);
    });
  });
