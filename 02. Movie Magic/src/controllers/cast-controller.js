import { Router } from "express";
import castServices from "../services/cast-services.js";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create');
})

castController.post('/create', (req, res) => {
    const castData = req.body
    castServices.create(castData);

    res.render('cast/create');
})

export default castController;