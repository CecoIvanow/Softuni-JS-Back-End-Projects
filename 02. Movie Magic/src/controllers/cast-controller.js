import { Router } from "express";
import castServices from "../services/cast-services.js";

const router = Router();

router.get('/create', (req, res) => {
    res.render('cast/create');
})

router.post('/create', (req, res) => {
    const castData = req.body
    castServices.create(castData);

    res.render('cast/create');
})

export default router;