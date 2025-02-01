import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    movie: Object,
    user: Object,
    movieType: String
});

const Movie = mongoose.model("Movie", Schema);

export default Movie;