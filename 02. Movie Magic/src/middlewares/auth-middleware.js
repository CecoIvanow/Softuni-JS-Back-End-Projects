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

export const isLogged = (userData) => {
    
    if (userData) {
        return true;;
    } else {
        return false;
    }
}