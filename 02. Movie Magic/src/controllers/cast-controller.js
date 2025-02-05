import { Router } from "express";
import castServices from "../services/cast-services.js";
import { isUserAuth } from "../middlewares/auth-middleware.js";

const castController = Router();

castController.get('/create', isUserAuth(), (req, res) => {
    res.render('cast/create');
})

castController.post('/create', isUserAuth(), (req, res) => {
    const castData = req.body
    castServices.create(castData);

    res.render('cast/create');
})

export default castController;