import { Router } from 'express';
import HireRequestController from '../controllers/HireRequestController';

const router = Router();

const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

router.post('/', isAuthenticated, HireRequestController.requestHire);
router.get('/job/:jobId', isAuthenticated, HireRequestController.getHireRequestsForJob);
router.put('/:requestId/status', isAuthenticated, HireRequestController.updateHireRequestStatus);

export default router;
