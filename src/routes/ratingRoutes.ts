import { Router } from 'express';
import RatingController from '../controllers/RatingController';

const router = Router();

router.post('/provider/:providerId/rate', RatingController.addRating);

export default router;
