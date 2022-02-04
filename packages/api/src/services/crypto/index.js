const crypto = require("crypto");

function getHash(value) {
  return crypto.createHmac("sha256", process.env.SECRET_CRYPTO).update(value).digest("hex");
}

module.exports = {
  getHash,
};
