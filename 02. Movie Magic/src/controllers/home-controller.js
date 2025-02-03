import { Router } from "express";
import movieServices from "../services/movie-services.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieServices.getAll();
    res.render('home', { movies });
})

homeController.get('/about', (req, res) => {
    res.render('about');
})

homeController.get('*', (req, res) => {
    res.render('404')
})

export default homeController;