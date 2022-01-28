const { app } = require("./server");
const { config } = require("./config");
const { connect, seed } = require("./db");

if (!config.app.port) {
  throw new Error("App config is invalid");
}

connect()
  // .then(() => {
  //   return seed();
  // })
  .then(() => {
    app.listen(config.app.port, () => {
      console.log(`Server listening on ${config.app.port}`);
    });
  });
