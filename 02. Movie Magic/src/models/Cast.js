import { Schema, model } from "mongoose";

const castsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    born: {
        type: String,
        required: true
    },
    'name-in-movie':{
        type: String,
        required: true // TODO: Need to change it when the rest is implemented
    },
    'cast-image': {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: false 
    }
})

const Cast = model('Cast', castsSchema);

export default Cast;