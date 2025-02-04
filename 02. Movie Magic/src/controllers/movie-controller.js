import { Router } from "express";
import movieServices from "../services/movie-services.js";
import castServices from "../services/cast-services.js";
import Movie from "../models/Movies.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', (req, res) => {
    const movieData = req.body;
    const creatorId = req.user.id

    movieServices.create(movieData, creatorId);

    res.redirect('/');
    res.end();
})

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.findMovie(movieId)

    res.render('movies/details', { movie });
})

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieServices.getAll(filter);

    res.render('movies/search', { movies });
})

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.findMovie(movieId);
    const casts = await castServices.getAll( {exclude: movie.casts} );

    res.render('movies/attach', { movie, casts })
})

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    
    await movieServices.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);

    if (!movie) {
        res.redirect('/404');
    }

    movieServices.deleteMovie(movieId);
    res.redirect('/');
})

export default movieController;