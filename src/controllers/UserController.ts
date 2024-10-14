import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  // List all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find(); 
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  // List users based on type (as defined previously)
  async listUsersByType(req: Request, res: Response): Promise<void> {
    const { userType } = req.query;

    try {
      const users = await User.find({ userType }); 
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }
  async banUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params; 

    try {
      await User.findByIdAndUpdate(userId, { isBanned: true });
      res.json({ message: 'User banned successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error banning user', error });
    }
  }

  // Unban a user
  async unbanUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params; 

    try {
      await User.findByIdAndUpdate(userId, { isBanned: false });
      res.json({ message: 'User unbanned successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error unbanning user', error });
    }
  }

  // View user profile
  async viewUserProfile(req: Request, res: Response): Promise<void> {
    const { userId } = req.params; 

    try {
      const user = await User.findById(userId).select('-password'); // Exclude password
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error });
    }
  }

  // Verify a user
  async verifyUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params; 

    try {
      await User.findByIdAndUpdate(userId, { isVerified: true });
      res.json({ message: 'User verified successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error verifying user', error });
    }
  }
}

export default new UserController();
