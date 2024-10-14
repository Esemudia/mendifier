import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

class TransactionController {
  // Fetch transaction history for a specific user
  async getTransactionHistory(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;

    try {
      const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transaction history', error });
    }
  }

  // Add a credit transaction
  async addCreditTransaction(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ message: 'Amount must be a positive number' });
      return;
    }

    try {
      const creditTransaction = new Transaction({
        user: userId,
        amount,
        type: 'credit',
        description: description || 'Credit transaction',
      });

      await creditTransaction.save();
      res.status(201).json({ message: 'Credit transaction added successfully', transaction: creditTransaction });
    } catch (error) {
      res.status(500).json({ message: 'Error adding credit transaction', error });
    }
  }

  // Add a debit transaction
  async addDebitTransaction(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ message: 'Amount must be a positive number' });
      return;
    }

    try {
      const debitTransaction = new Transaction({
        user: userId,
        amount: -amount,  // Store negative amount for debit if necessary
        type: 'debit',
        description: description || 'Debit transaction',
      });

      await debitTransaction.save();
      res.status(201).json({ message: 'Debit transaction added successfully', transaction: debitTransaction });
    } catch (error) {
      res.status(500).json({ message: 'Error adding debit transaction', error });
    }
  }
}

export default new TransactionController();
