import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

class AdminController {
  // Register a new admin
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        res.status(400).json({ message: 'Admin already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ email, password: hashedPassword });

      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering admin', error });
    }
  }

  // Login an admin
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Admin logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}

export default new AdminController();
