const { app } = require("./server");
const { config, mode } = require("./config");
const { connect, seed } = require("./db");

async function init() {
  if (!config.app.port) {
    throw new Error("App config is invalid");
  }

  console.log(`Environment mode: ${mode}`);

  await connect();
  // await seed();

  app.listen(config.app.port, () => {
    console.log(`Server listening on ${config.app.port}`);
  });
}

init();
