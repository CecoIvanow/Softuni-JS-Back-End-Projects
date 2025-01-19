import { Router } from 'express'
import homeController from './controllers/home-controller.js'
import movieController from './controllers/movie-controller.js'

const router = Router();

router.use(movieController);
router.use(homeController);

export default router;