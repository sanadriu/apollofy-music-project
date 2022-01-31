const { Types } = require("mongoose");
const { User, Playlist, Album, Track } = require("../models");
const { getUserProfile } = require("./utils");
const { mode } = require("../config");
const { logger } = require("../services");
const { auth } = mode === "test" ? require("../services/__mocks__") : require("../services");

async function signUp(req, res, next) {
  const { uid, email, name } = req.user;
  console.log(req.user);

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
    const { page = 1, sort = "created_at", order = "asc" } = req.query;

    const pages = await User.getNumPages();

    if (isNaN(page) || page <= 0) {
      return res.status(400).send({
        data: null,
        error: "Wrong value for page",
        pages,
      });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).send({
        data: null,
        error: "Wrong value for order",
        pages,
      });
    }

    if (page > pages) {
      return res.status(404).send({
        data: null,
        error: "Page not found",
        pages,
      });
    }

    const dbRes = await User.getUsers(page, sort, order);

    return res.status(200).send({
      data: dbRes,
      error: null,
      pages,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleUser(req, res, next) {
  try {
    const { idUser } = req.params;
    const { extend = false } = req.query;

    const dbRes = await User.getUser(idUser, extend);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "User not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getSelfUser(req, res, next) {
  try {
    const { uid } = req.user;
    const { extend = false } = req.query;

    const dbRes = await User.getUser(uid, extend);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "User not puto",
      });
    }

    return res.status(200).send({
      data: dbRes,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const details = req.body;
    const { uid } = req.user;

    const dbRes = await User.updateUser(uid, details);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "User not found",
      });
    }

    return res.status(200).send({
      data: "User updated successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { uid } = req.user;

    const dbRes = await User.deleteUser(uid);

    if (!dbRes) {
      return res.status(404).send({
        data: null,
        error: "User not found",
      });
    }

    await auth.deleteUser(uid);

    return res.status(200).send({
      data: "User deleted successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function likeAlbum(req, res, next) {
  try {
    const { uid } = req.user;
    const { idAlbum } = req.params;

    if (!Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        error: "Wrong album ID",
        data: null,
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

    if (!(await Album.getAlbum(idAlbum))) {
      return res.status(404).send({
        error: "Album not found",
        data: null,
      });
    }

    await User.likeAlbum(uid, idAlbum);
    await Album.getLiked(idAlbum, uid);

    return res.status(200).send({
      data: "Operation done successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function likeTrack(req, res, next) {
  try {
    const { uid } = req.user;
    const { idTrack } = req.params;

    if (!Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        error: "Wrong track ID",
        data: null,
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

    if (!(await Track.getTrack(idTrack))) {
      return res.status(404).send({
        error: "Track not found",
        data: null,
      });
    }

    await User.likeTrack(uid, idTrack);
    await Track.getLiked(idTrack, uid);

    return res.status(200).send({
      data: "Operation done successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function followPlaylist(req, res, next) {
  try {
    const { uid } = req.user;
    const { idPlaylist } = req.params;

    if (!Types.ObjectId.isValid(idPlaylist)) {
      return res.status(400).send({
        error: "Wrong playlist ID",
        data: null,
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

    if (!(await Playlist.getPlaylist(idPlaylist))) {
      return res.status(404).send({
        error: "User to be followed not found",
        data: null,
      });
    }

    await User.followPlaylist(uid, idPlaylist);
    await Playlist.getFollowed(idPlaylist, uid);

    return res.status(200).send({
      data: "Operation done successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function followUser(req, res, next) {
  try {
    const { uid } = req.user;
    const { idUser } = req.params;

    if (uid === idUser) {
      return res.status(400).send({
        error: "Users must be different",
        data: null,
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

    if (!(await User.getUser(idUser))) {
      return res.status(404).send({
        error: "User to be followed not found",
        data: null,
      });
    }

    await User.followUser(uid, idUser);
    await User.getFollowed(idUser, uid);

    return res.status(200).send({
      data: "Operation done successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signOut,
  getUsers,
  getSingleUser,
  getSelfUser,
  updateUser,
  deleteUser,
  likeAlbum,
  likeTrack,
  followUser,
  followPlaylist,
};
