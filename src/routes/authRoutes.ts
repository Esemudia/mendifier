import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/user/profile',
    failureRedirect: '/auth/google/failure',
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.redirect('/');
  });
});

export default router;
