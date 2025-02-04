import jwt from 'jsonwebtoken';

export const authMiddleware = () => (req, res, next) => {
    const token = req.cookies['auth'];
    
    if (!token) {
        return next();
    }

    try {
        const userData = jwt.verify(token, process.env.SECRET)
        req.user = userData;
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/404');
    }
        
    next();
} 