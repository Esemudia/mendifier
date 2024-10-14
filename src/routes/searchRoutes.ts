import { Router } from 'express';
import SearchController from '../controllers/SearchController';

const router = Router();

router.get('/providers', SearchController.searchProviders);

export default router;
