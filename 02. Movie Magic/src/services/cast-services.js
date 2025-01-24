import Cast from "../models/Cast.js";

async function create(castData) {
    const cast = new Cast(castData);
    
    await cast.save();
}

export default {
    create
}