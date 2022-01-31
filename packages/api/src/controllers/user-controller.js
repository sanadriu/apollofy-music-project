const { Types } = require("mongoose");
const { User } = require("../models");
const { getUserProfile } = require("./utils");
const { auth } =
  process.env.NODE_ENV === "test"
    ? require("../services/__mocks__")
    : require("../services");

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

async function getUsers_v1(req, res, next) {
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

async function getUsers(req, res, next) {
  try {
    const { page = 1, sort = "created_at", order = "asc" } = req.query;

    const pages = await User.getNumPages();

    if (!(!isNaN(page) && page > 0)) {
      return res.status(400).send({
        data: null,
        error: "Wrong page",
        pages,
      });
    }

<<<<<<< HEAD
    if (page > pages) {
      return res.status(404).send({
        data: null,
        error: "Page not found",
        pages,
=======
    if (response.data.data) {
      return res.status(200).send({
        data: response.data.data,
        error: null,
>>>>>>> 5d42184b537534263cf03208f8acad9b67b0ebcd
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

async function getSingleUser_v1(req, res, next) {
  var populateQuery = [
    { path: "liked_albums", select: "title thumbnails year genres" },
    { path: "liked_tracks" },
    { path: "followed_playlists" },
    { path: "followed_users" },
    { path: "followers" },
  ];

<<<<<<< HEAD
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
=======
    res.status(201).send({
      data: response.data,
>>>>>>> 5d42184b537534263cf03208f8acad9b67b0ebcd
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser_v1(req, res, next) {
  try {
    const newData = req.body;
    const { uid } = req.user;

    const dbRes = await User.findOneAndUpdate({ _id: uid }, newData, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: dbRes,
    });
  } catch (error) {
    console.log(error);
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

    if (Types.ObjectId.isValid(idAlbum)) {
      return res.status(400).send({
        error: "Wrong album ID",
        data: null,
      });
    }

    const dbRes = await User.likeAlbum(uid, idAlbum);

    if (!dbRes) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

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

    if (Types.ObjectId.isValid(idTrack)) {
      return res.status(400).send({
        error: "Wrong track ID",
        data: null,
      });
    }

    const dbRes = await User.likeAlbum(uid, idAlbum);

    if (!dbRes) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

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
    const { idFollowedUser } = req.params;

    const dbRes = await User.followUser(uid, idFollowedUser);

    if (!dbRes) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

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

    const dbRes = await User.followPlaylist(uid, idPlaylist);

    if (!dbRes) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

    return res.status(200).send({
      data: "Operation done successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getFollowed(req, res, next) {
  try {
    const { uid } = req.user;
    const { idFollower } = req.params;

    const dbRes = await User.getFollowed(uid, idFollower);

    if (!dbRes) {
      return res.status(404).send({
        error: "User not found",
        data: null,
      });
    }

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
  updateUser,
  deleteUser,
  likeAlbum,
  likeTrack,
  followUser,
  followPlaylist,
  getFollowed,
};
