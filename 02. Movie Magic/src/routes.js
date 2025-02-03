import { Router } from 'express'
import homeController from './controllers/home-controller.js'
import movieController from './controllers/movie-controller.js'
import castController from './controllers/cast-controller.js'
import userController from './controllers/user-controller.js'

const router = Router();

router.use('/cast', castController);
router.use('/movies', movieController);
router.use(userController);
router.use(homeController);

export default router;