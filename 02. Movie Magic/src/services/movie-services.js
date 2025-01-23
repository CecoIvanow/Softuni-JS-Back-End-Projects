import movies from "../movies.js"
import Movie from "../models/Movies.js";

async function create(movieData) {
    const movie = new Movie(movieData);

    await movie.save();
}

function findMovie(movieId) {
    const movieData = movies.filter(movie => movie.id === movieId);

    return movieData.at(0);
}

function getAll(filter = {}) {
    let result = movies;

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