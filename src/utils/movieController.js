const Movie = require("../movie/movieModel");

exports.addMovie = async (req, res) => {
    try {
        if (req.body.title && req.body.actor){
            console.log(req.body)
            await Movie.create({title: req.body.title, actor: req.body.actor});
            res.status(201).send({title: req.body.title, actor: req.body.actor});
        }
        else {
            console.log("no title or actor found")
            res.status(400).send({error: "no title or actor found"})
        }
    } catch (e) {
        console.log("error in add movie")
        res.status(500).send({error:"internal server error"})
        console.log(e)

    }
}

exports.listMovie = async (req, res) => {
    try {
        let movieList = await Movie.find({});
        if (movieList.length > 0){
            console.log("inside listMovie")
            res.status(200).send({movieList});
        }
        else {
            console.log("Nothing to display")
            res.status(400).send({error: "request failed"})
        }
    } catch (e) {
        console.log("error in listMovie")
        res.status(500).send({error:"internal server error"})
        console.log(e)
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        let movieList = await Movie.find({})
        console.log(movieList)
        if ((req.body.title && req.body.actor) && movieList.length > 0){
            await Movie.deleteOne({ title: req.body.title, actor: req.body.actor })
            res.status(200).send(await Movie.find({}))
        }
        else {
            console.log("Nothing to delete")
            res.status(400).send({error: "request failed"})
        }
    } catch (e) {
        console.log("error in deleteMovie")
        res.status(500).send({error:"internal server error"})
        console.log(e)
    }
}

exports.deleteMovies = async (req, res) => {
    try {
        let movieList = await Movie.find({})
        if (movieList.length > 0){
            await Movie.deleteMany({movieList})
            res.status(200).send("Contents deleted")
        }
        else {
            console.log("Nothing to delete")
            res.status(400).send({error: "request failed"})
        }
    } catch (e) {
        console.log("error in deleteMovies")
        res.status(500).send({error:"internal server error"})
        console.log(e)
    }
}


// exports.deleteMovies = async () => {
//     try {
//         return await Movie.deleteMany({})
//     } catch (error) {
//         console.log("Error within deleteMovies\n\n"+error)
//     }
// }

// exports.updateMovie = async (movieObject, updateMovieObject) => {
//     try {
//         return await Movie.updateOne(movieObject, updateMovieObject)
//     } catch (error) {
//         console.log("Error within updateMovie\n\n"+error)
//     }
// }

// exports.findMoviesCast = async (actorObject) => {
//     try {
//         return await Movie.find(actorObject)
//     } catch (error) {
//         console.log("Error within findMoviesCast\n\n"+error)
//     }
// }

// exports.findMoviesTitle = async (titleObject) => {
//     try {
//         return await Movie.findOne(titleObject)
//     } catch (error) {
//         console.log("Error within findMoviesTitle\n\n"+error)
//     }
// }