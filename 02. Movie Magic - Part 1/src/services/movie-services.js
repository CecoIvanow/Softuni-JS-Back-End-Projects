import movies from "../movies.js"

function create(movieData) {
    movies.push(movieData);
}

export default {
    create
}