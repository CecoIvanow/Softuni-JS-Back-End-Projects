import { Router } from "express";
import userServices from "../services/user-services.js";
import { isUserAuth } from "../middlewares/auth-middleware.js";

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register');
})

userController.post('/register', (req, res) => {
    const userData = req.body;

    userServices.register(userData);
    res.redirect('/')
})

userController.get('/login', (req, res) => {
    res.render('user/login');
})

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userServices.login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.redirect('/404')
    }
})

userController.get('/logout', isUserAuth(), (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default userController;