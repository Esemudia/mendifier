import { Router } from 'express';
import UserController from '../controllers/UserController';
import { isAdmin } from '../middleware/authMiddleware';  // Optional, if you want to restrict access

const router = Router();


router.get('/', isAdmin, UserController.getAllUsers); // Protect with isAdmin middleware if desired
router.get('/list', isAdmin, UserController.listUsersByType);
router.put('/ban/:userId', isAdmin, UserController.banUser); 
router.put('/unban/:userId', isAdmin, UserController.unbanUser); 
router.get('/profile/:userId', UserController.viewUserProfile); 
router.put('/verify/:userId', isAdmin, UserController.verifyUser); 
export default router;
