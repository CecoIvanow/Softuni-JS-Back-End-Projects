import jwt from 'jsonwebtoken';

export const authMiddleware = () => (req, res, next) => {
    const token = req.cookies['auth'];
    
    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        req.user = decodedToken;
        res.locals.user = decodedToken;
        
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/404');
    }
        
    next();
}

export const isUserAuth = () => (req, res, next) => {

    if (req.user) {
        next();
        return
    }
    
    return res.redirect('/login');
}

export const isGuestAuth = () => (req, res, next) => {
     
    if (!req.user) {
        next();
        return;
    }

    return res.redirect('/');
}