import movies from "../movies.js"

function create(movieData) {
    movies.push(movieData);
}

function findMovie(movieId) {
    const movieData = movies.filter(movie => movie.id === movieId);

    return movieData.at(0);
}

function getAll() {
    return movies;
}

export default {
    findMovie,
    getAll,
    create
}