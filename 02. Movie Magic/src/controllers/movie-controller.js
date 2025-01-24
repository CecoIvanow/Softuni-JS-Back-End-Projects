import { Router } from "express";
import movieServices from "../services/movie-services.js";
import castServices from "../services/cast-services.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('movies/create');
});

router.post('/create', (req, res) => {
    const movieData = req.body;
    movieServices.create(movieData);

    res.redirect('/');
    res.end();
})

router.get('/details/:userId', async (req, res) => {
    const movieId = req.params.userId;
    const movie = await movieServices.findMovie(movieId)

    res.render('movies/details', { movie });
})

router.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieServices.getAll(filter);

    res.render('movies/search', { movies });
})

router.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieServices.findMovie(movieId);
    const cast = await castServices.getAll();

    res.render('movies/attach', { movie, cast })
})

export default router;