import { Schema, Types, model } from "mongoose";

const moviesSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [5, 'Title must be atleast 5 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title is allowed to contain only English letters, digits, and whitespaces']
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLength: [5, 'Genre must be atleast 5 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Genre is allowed to contain only English letters, digits, and whitespaces']
    },
    director: {
        type: String,
        required: [true, 'Director is required'],
        minLength: [5, 'Director must be atleast 5 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Director name isllowed to contain only English letters, digits, and whitespaces']
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1900, 'Earliest year should be 1900'],
        max: [2024, 'Latest year should be up until 2024']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be 10 max']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [20, 'Description must be atleast 5 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Description is allowed to contain only English letters, digits, and whitespaces']
    },
    imageUrl: {
        type: String,
        match: [/^http:\/\/|^https:\/\//, 'imageUrl should start with either http:// or https://']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }

})

const Movie = model('Movie', moviesSchema);

export default Movie;