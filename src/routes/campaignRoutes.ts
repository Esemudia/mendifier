import { Router } from 'express';
import CampaignController from '../controllers/CampaignController';

const router = Router();

router.post('/', CampaignController.createCampaign);

export default router;
