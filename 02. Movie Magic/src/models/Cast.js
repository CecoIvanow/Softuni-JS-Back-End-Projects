import { Schema, model } from "mongoose";

const castsSchema = new Schema ({
    name: String,
    age: Number,
    born: String,
    'name-in-movie': String,
    'cast-image': String,
    movie: String
})

const Cast = model('Cast', castsSchema);

export default Cast;