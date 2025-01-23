import { Router } from "express";
import movieServices from "../services/movie-services.js";

const router = Router();

router.get('/', async (req, res) => {
    const movies = await movieServices.getAll();
    res.render('home', { movies });
})

router.get('/about', (req, res) => {
    res.render('about');
})

router.get('*', (req, res) => {
    res.render('404')
})

export default router;