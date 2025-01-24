import { Schema, Types, model } from "mongoose";

const moviesSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    rating: Number,
    description: String,
    imageUrl: String,
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }]
    
})

const Movie = model('Movie', moviesSchema);

export default Movie;