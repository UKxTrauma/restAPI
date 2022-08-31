const { Router } = require("express")
const movieRouter = Router()
const {listMovie, addMovie, deleteMovie, deleteMovies} = require("../utils/movieController")

movieRouter.get("/listmovie", listMovie);
movieRouter.post("/addmovie", addMovie);
movieRouter.delete("/deletemovie", deleteMovie);
movieRouter.delete("/deletemovies", deleteMovies);

module.exports = movieRouter