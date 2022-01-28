const { UserRepo } = require("../repositories");
const db = require("../models");

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: "OK",
        error: null,
      });
    }

    await UserRepo.create({
      _id: uid,
      email: email,
    });

    res.status(201).send({
      data: "OK",
      error: null,
    });
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
    const dbRes = await db.User.find({});

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

    const dbRes = await db.User.findOne({
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
    const { newData } = req.body;
    const { idUser } = req.params;

    const dbRes = await db.User.findOneAndUpdate({ _id: idUser }, newData, {
      new: true,
      runValidators: true,
    });

    res.status(201).send({
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
  updateUser
};
