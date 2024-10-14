import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

const router = Router();

router.get('/history', isAuthenticated, TransactionController.getTransactionHistory);
router.post('/credit', isAuthenticated, TransactionController.addCreditTransaction);
router.post('/debit', isAuthenticated, TransactionController.addDebitTransaction);

export default router;
