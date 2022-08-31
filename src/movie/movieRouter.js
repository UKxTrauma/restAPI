const { Router } = require("express")
const movieRouter = Router()
const {listMovie, addMovie} = require("../utils/movieController")

movieRouter.get("/movie", listMovie);
movieRouter.post("/movie", addMovie);

module.exports = movieRouter