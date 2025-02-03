import { Router } from "express";
import userServices from "../services/user-services.js";

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register');
})

userController.post('/register', (req, res) => {
    const userData = req.body;

    userServices.register(userData);
    res.redirect('/')
})

export default userController;