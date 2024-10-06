import { Router } from 'express';
import JobController from '../controllers/JobController';

const router = Router();

const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

router.post('/', isAuthenticated, JobController.createJob);
router.get('/', JobController.getJobs);
router.put('/:jobId', isAuthenticated, JobController.updateJob);

export default router;
