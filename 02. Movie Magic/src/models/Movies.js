import { Schema, Types, model } from "mongoose";

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director:  {
        type: String,
        required: true
    },
    year:  {
        type: Number,
        required: true,
        min: 1850,
        max: 2100
    },
    rating:  {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    description:  {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cast: {
        type: Types.ObjectId,
        ref: 'Cast'
    }
    
})

const Movie = model('Movie', moviesSchema);

export default Movie;