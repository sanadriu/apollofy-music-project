const { User } = require("../models");
const { mode } = require("../config");
const { auth } = mode === "test" ? require("../services/__mocks__") : require("../services");

async function signUp(req, res, next) {
  const { uid, email, name } = req.user;

  try {
    const dbRes = await User.findOne({ email });

    if (dbRes !== null) {
      return res.status(400).send({
        data: null,
        success: false,
        message: `Email ${email} is already in use`,
      });
    }

    await User.create({ _id: uid, email: email, username: name });

    return res.status(201).send({
      data: "OK",
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const { email } = req.user;

    const dbRes = await User.findOne({ email });

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  res.status(200).send({
    data: "OK",
    success: true,
  });
}

async function getUsers(req, res, next) {
  try {
    const { page = 1, sort = "created_at", order = "asc", limit = 10, no_data = false } = req.query;

    const pages = await User.getNumPages(limit);
    const count = await User.countDocuments();

    if (!no_data) {
      if (isNaN(page) || page <= 0) {
        return res.status(400).send({
          data: null,
          success: false,
          message: "Wrong value for page",
          pages,
        });
      }

      if (!["asc", "desc"].includes(order)) {
        return res.status(400).send({
          data: null,
          message: "Wrong value for order",
          success: false,
          pages,
        });
      }

      if (count === 0) {
        return res.status(200).send({
          data: [],
          success: true,
          message: "No users were found",
          pages,
        });
      }

      if (page > pages) {
        return res.status(404).send({
          data: null,
          success: false,
          message: "Page not found",
          pages,
        });
      }

      const dbRes = await User.getUsers({ page, sort, order, limit }).select("-email");

      return res.status(200).send({
        data: dbRes,
        success: true,
        message: "Users fetched successfully",
        count,
        pages,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Request successful",
        count,
        pages,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getSingleUser(req, res, next) {
  try {
    const { idUser } = req.params;
    const { extend = false } = req.query;

    const dbRes = await User.getUser(idUser, { extend }).select("-email");

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "User fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function getUserProfile(req, res, next) {
  try {
    const { uid } = req.user;
    const { extend = false } = req.query;

    const dbRes = await User.getUser(uid, { extend });

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "User fetched successfully",
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

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      data: dbRes,
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { uid } = req.user;

    const dbRes = await User.deleteUser(uid);

    if (dbRes === null) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    await auth.deleteUser(uid);

    return res.status(200).send({
      data: null,
      success: true,
      message: "User deleted successfully",
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
        data: null,
        success: false,
        message: "Users must be different",
      });
    }

    if (!(await User.getUser(uid))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }

    if (!(await User.getUser(idUser))) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User to be followed not found",
      });
    }

    await User.followUser(uid, idUser);
    await User.getFollowed(idUser, uid);

    return res.status(200).send({
      data: null,
      success: true,
      message: "Operation done successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getUsers,
  getSingleUser,
  getUserProfile,
  updateUser,
  deleteUser,
  followUser,
};
