import Cast from "../models/Cast.js";

async function create(castData) {
    const cast = new Cast(castData);
    
    await cast.save();
}

async function getAll(filter = {}) {
    let query = await Cast.find( {_id: {$nin: filter.exclude} } );

    return query;
}

export default {
    create,
    getAll
}