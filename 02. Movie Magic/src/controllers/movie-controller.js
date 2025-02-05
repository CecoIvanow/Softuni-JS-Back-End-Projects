import { Router } from "express";
import movieServices from "../services/movie-services.js";
import castServices from "../services/cast-services.js";
import Movie from "../models/Movies.js";
import { isUserAuth } from "../middlewares/auth-middleware.js";
import { getMovieCategoriesViewData } from "../views-data/movies-data.js";

const movieController = Router();

movieController.get('/create', isUserAuth(), (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', isUserAuth(), (req, res) => {
    const movieData = req.body;
    const creatorId = req.user.id

    movieServices.create(movieData, creatorId);

    res.redirect('/');
    res.end();
})

movieController.get('/:movieId/details', isUserAuth(), async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.findMovie(movieId)
    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movies/details', { movie, isCreator });
})

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieServices.getAll(filter);

    res.render('movies/search', { movies });
})

movieController.get('/:movieId/attach-cast', isUserAuth(), async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.findMovie(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    if (!isCreator) {
        return res.redirect('/');
    }

    const casts = await castServices.getAll({ exclude: movie.casts });

    res.render('movies/attach', { movie, casts })
})

movieController.post('/:movieId/attach-cast', isUserAuth(), async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const movie = await movieServices.findMovie(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    if (!isCreator) {
        return res.redirect('/');
    }

    await movieServices.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', isUserAuth(), async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    if (!isCreator) {
        return res.redirect('/');
    }

    if (!movie) {
        return res.redirect('/404');
    }

    movieServices.deleteMovie(movieId);
    res.redirect('/');
})

movieController.get('/:movieId/edit', isUserAuth(), async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    if (!isCreator) {
        return res.redirect('/');
    }

    const categories = getMovieCategoriesViewData(movie.category);

    res.render('movies/edit', { movie, categories });
})

export default movieController;