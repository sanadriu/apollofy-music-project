const { Track } = require("../models");

async function getTracks(req, res, next) {
  try {
    const dbRes = await Track.find({}).exists("deleted_at", false);

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleTrack(req, res, next) {
  var populateQuery = [
    { path: "albums", select: "title thumbnails year genres" },
    { path: "genres", select: "name" },
    //{ path: "liked_by" },
  ];

  try {
    const { idTrack } = req.params;

    const dbRes = await Track.findOne({
      _id: idTrack,
    })
      .populate(populateQuery)
      .exists("deleted_at", false);

    if (dbRes === null) {
      return res.status(404).send({
        success: false,
        message: "Track not found",
        data: dbRes,
      });
    }

    res.status(200).send({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTracks,
  getSingleTrack,
};
