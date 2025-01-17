import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/about', (req, res) => {
    res.render('about');
})

router.get('*', (req, res) => {
    res.render('404')
})

export default router;