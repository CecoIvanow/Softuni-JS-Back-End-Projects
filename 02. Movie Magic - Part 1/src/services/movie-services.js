import movies from "../movies.js"
import { v4 as uuid } from "uuid";

function create(movieData) {
    const id = uuid();
    movieData.id = id;

    movies.push(movieData);
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