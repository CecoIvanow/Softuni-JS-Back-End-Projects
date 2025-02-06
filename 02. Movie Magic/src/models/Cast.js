import { Schema, model } from "mongoose";

const castsSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be atleast 5 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Name is allowed to contain only English letters, digits, and whitespaces']
    },
    age: {
        type: Number,
        min: [1, 'Age must be atleast 1'],
        max: [120, 'Age cannot exceed 120']
    },
    born: {
        type: String,
        required: [true, 'Born is required'],
        minLength: [5, 'Born must be atleast 10 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Born is allowed to contain only English letters, digits, and whitespaces']
    },
    'name-in-movie': {
        type: String,
        required: [true, 'Name in movie is required'],
        minLength: [5, 'Name in movie must be atleast 5 characters long'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Name in movie is allowed to contain only English letters, digits, and whitespaces']
    },
    'cast-image': {
        type: String,
        match: [/^http:\/\/|^https:\/\//, 'imageUrl should start with either http:// or https://']
    },
    movie: String
})

const Cast = model('Cast', castsSchema);

export default Cast;