import { Router } from 'express';
import User from '../models/User';

const router = Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
};

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  res.json(req.user);
});

// Update user profile details
router.put('/profile', isAuthenticated, async (req, res) => {
  const { bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { bio }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

export default router;
