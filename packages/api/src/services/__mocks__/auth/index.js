const { User } = require("../../../models");

function verifyIdToken(token) {
  return User.findOne({ _id: token })
    .select("email username")
    .then((result) => ({
      uid: result._id,
      email: result.email,
      name: result.username,
    }));
}

function getAuthToken(headers = {}) {
  return new Promise(function (resolve, reject) {
    if (
      !headers.authorization ||
      !headers.authorization.startsWith("Bearer ")
    ) {
      reject(new Error("Missing authorization header"));
    }

    const bearerToken = headers.authorization.substr(7);

    resolve(bearerToken);
  });
}

function login(req = {}, userClaims = {}) {
  const { email, uid, name } = userClaims;

  if (typeof email !== "string" || typeof uid !== "string") {
    throw new Error("Missing user claims");
  }

  req.user = {
    email,
    uid,
    name,
  };
}

module.exports = {
  verifyIdToken,
  getAuthToken,
  login,
};
