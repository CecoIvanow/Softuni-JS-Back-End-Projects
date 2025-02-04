import Movie from "../models/Movies.js";

async function create(movieData, creatorId) {
    movieData.creator = creatorId;

    const movie = new Movie(movieData);

    await movie.save();
}

async function findMovie(movieId) {
    const query = await Movie.findById(movieId).populate('casts');

    return query;
}

async function getAll(filter = {}) {
    let query = await Movie.find({}).lean();

    if (filter.title) {
        query = query.filter(el => el.title.toLowerCase().includes(filter.title.toLowerCase()));    
    }

    if (filter.genre) {
        query = query.filter(el => el.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }

    if (filter.year) {
        query = query.filter(el => el.year === filter.year);
    }

    return query;
}

async function attachCast(movieId, castId) {
    const query = await Movie.findById(movieId);
    query.casts.push(castId);
    
    await query.save();
}

export default {
    attachCast,
    findMovie,
    getAll,
    create
}