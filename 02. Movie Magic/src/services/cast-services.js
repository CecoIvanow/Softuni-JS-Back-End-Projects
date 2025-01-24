import Cast from "../models/Cast.js";

async function create(castData) {
    const cast = new Cast(castData);
    
    await cast.save();
}

async function getAll() {
    const allCast = await Cast.find({});

    return allCast;
}

export default {
    create,
    getAll
}