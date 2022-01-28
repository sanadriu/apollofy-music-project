const { User } = require("../models");
const { getUserProfile } = require("./utils");

async function signUp(req, res, next) {
  const { uid, email, name } = req.user;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).send({
        data: getUserProfile(user),
        error: null,
      });
    } else {
      const newUser = await User.create({
        _id: uid,
        email: email,
        username: name,
      });

      res.status(201).send({
        data: getUserProfile(newUser),
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

async function getUsers(req, res, next) {
  try {
    const dbRes = await User.find({});

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleUser(req, res, next) {
  var populateQuery = [
    { path: "liked_albums", select: "title thumbnails year genres" },
    { path: "liked_tracks" },
    { path: "followed_playlists" },
    { path: "followed_users" },
    { path: "followers" },
  ];

  try {
    const { idUser } = req.params;

    const dbRes = await User.findOne({
      _id: idUser,
    }).populate(populateQuery);

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const newData = req.body;
    const { uid } = req.user;

    const dbRes = await User.findOneAndUpdate({ _id: uid }, newData, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      success: true,
      message: "User updated",
      data: dbRes,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteUser(req, res, next) {}

module.exports = {
  signUp,
  signOut,
  getUsers,
  getSingleUser,
  updateUser,
};
