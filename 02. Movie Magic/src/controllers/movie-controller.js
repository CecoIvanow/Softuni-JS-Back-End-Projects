import { Router } from "express";
import movieServices from "../services/movie-services.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const movieData = req.body;
    movieServices.create(movieData);

    res.redirect('/');
    res.end();
})

router.get('/details/:userId', (req, res) => {
    const movieId = req.params.userId;
    const movie = movieServices.findMovie(movieId)

    res.render('details', { movie });
})

router.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieServices.getAll(filter);

    res.render('search', { movies });
})

export default router;