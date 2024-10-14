import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const router = Router();

// Route to register a new admin
router.post('/register', AdminController.register);

// Route to login as an admin
router.post('/login', AdminController.login);

export default router;
