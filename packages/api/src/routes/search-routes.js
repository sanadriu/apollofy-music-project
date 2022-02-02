const Router = require("express").Router;
const { searchController } = require("../controllers");

const searchRouter = Router();

searchRouter.get("/", searchController.search);


module.exports = {
    searchRouter,
  };
  