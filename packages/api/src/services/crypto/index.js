const crypto = require("crypto");
const { config } = require("../../config");

function getHash(value) {
  if (config.encryption.secret === undefined) throw new Error("Secret key required for encription");

  return crypto.createHmac("sha256", config.encryption.secret).update(value).digest("hex");
}

module.exports = {
  getHash,
};
