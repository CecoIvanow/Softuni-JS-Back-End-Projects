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

router.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
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
    const casts = await castServices.getAll( {exclude: movie.casts} );

    res.render('movies/attach', { movie, casts })
})

router.post('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    
    await movieServices.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
})

export default router;