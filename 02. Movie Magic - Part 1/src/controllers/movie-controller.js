import { Router } from "express";

const router = Router();

router.get('/create', (req, res) => {
    res.render('create');
});

export default router;