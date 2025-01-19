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
export default router;