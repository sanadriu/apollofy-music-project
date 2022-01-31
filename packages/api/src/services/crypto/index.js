const crypto = require("crypto");

function getCryptoField(field) {
  return crypto
    .createHmac("sha256", process.env.SECRET_CRYPTO)
    .update(field)
    .digest("hex");
}

module.exports = {
  getCryptoField,
};
