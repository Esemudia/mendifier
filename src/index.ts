import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import campaignRoutes from './routes/campaignRoutes';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import hireRequestRoutes from './routes/hireRequestRoutes';
import searchRoutes from './routes/searchRoutes'; 
import ratingRoutes from './routes/ratingRoutes'; 
import transactionRoutes from './routes/transactionRoutes';
import adminRoutes from './routes/adminRoutes';
import getuserRoutes from './routes/getuserRoutes';


dotenv.config();
require('./config/passport');
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/hire-requests', hireRequestRoutes);
app.use('/search', searchRoutes);
app.use('/rate', ratingRoutes); 
app.use('/transactions', transactionRoutes); 
app.use('/admin', adminRoutes);  
app.use('/users', getuserRoutes);  

// Start Server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
