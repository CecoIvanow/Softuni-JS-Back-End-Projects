import { Router } from 'express'
import homeController from './controllers/home-controller.js'
import movieController from './controllers/movie-controller.js'

const router = Router();

router.use(homeController);
router.use(movieController);

export default router;