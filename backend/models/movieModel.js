import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  released: { type: Date },
});

const Movie = mongoose.model("Movies", movieSchema);

export default Movie;
