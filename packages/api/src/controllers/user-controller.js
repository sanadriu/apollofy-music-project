const { User } = require("../models");
const { UserRepo } = require("../repositories");

async function signUp(req, res, next) {
  const { uid, email, name } = req.user;

  try {
    const user = await User.findOne({ email });

    // if (response.error) {
    //   return res.status(400).send({
    //     data: null,
    //     error: response.error,
    //   });
    // }

    if (user) {
      res.status(200).send({
        data: user,
        error: null,
      });
    } else {
      const newUser = await User.create({
        _id: uid,
        email: email,
        username: name,
      });

      res.status(201).send({
        data: newUser,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  res.status(200).send({
    data: "OK",
    error: null,
  });
}

async function getUsers(req, res, next) {}

async function getSingleUser(req, res, next) {}

async function updateUser(req, res, next) {}

module.exports = {
  signUp: signUp,
  signOut: signOut,
};
