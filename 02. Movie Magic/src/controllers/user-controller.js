import { Router } from "express";
import userServices from "../services/user-services.js";
import { isGuestAuth, isUserAuth } from "../middlewares/auth-middleware.js";
import User from "../models/User.js";
import { getErrorMessage } from "../utils/error-utils.js";

const userController = Router();

userController.get('/register', isGuestAuth(), (req, res) => {
    res.render('user/register');
})

userController.post('/register', isGuestAuth(), async (req, res) => {
    const userData = req.body;
    const result = await User.findOne({ email: userData.email })

    try {
        if (userData.password !== userData.rePassword) {
            throw new Error("Passwords do not match");
        }
    

        if (result?.email === userData.email) {
            throw new Error("Email already in use");
        }

    } catch (error) {
        return res.render('user/register', { error: getErrorMessage(error)})
    }

    console.log(result);

    try {
        await userServices.register(userData);
    } catch (error) {
        return res.render('user/register', { error: getErrorMessage(error)})
    }
    
    res.redirect('/')
})

userController.get('/login', isGuestAuth(), (req, res) => {
    res.render('user/login');
})

userController.post('/login', isGuestAuth(), async (req, res) => {
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