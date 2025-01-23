import Movie from "../models/Movies.js";

async function create(movieData) {
    const movie = new Movie(movieData);

    await movie.save();
}

async function findMovie(movieId) {
    const movieData = await Movie.findById(movieId);

    return movieData;
}

async function getAll(filter = {}) {
    let result = await Movie.find({}).lean();

    if (filter.title) {
        result = result.filter(el => el.title.toLowerCase().includes(filter.title.toLowerCase()));    
    }

    if (filter.genre) {
        result = result.filter(el => el.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }

    if (filter.year) {
        result = result.filter(el => el.year === filter.year);
    }

    return result;
}

export default {
    findMovie,
    getAll,
    create
}