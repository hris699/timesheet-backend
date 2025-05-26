/**
 * Main application entry point.
 * Sets up Express server, middleware, routes, and error handling.
 * @author Your Name
 */

import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import contractorRoutes from './routes/contractor.js';
import recruiterRoutes from './routes/recruiter.js';
import auth from './middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Public routes (no auth)
app.use('/api/auth', authRoutes);

// Protected routes (with auth)
app.use(auth.authenticateJWT);
app.use('/api/admin', adminRoutes);
app.use('/api/contractor', contractorRoutes);
app.use('/api/recruiter', recruiterRoutes);

// Connect to MongoDB
console.log("Connecting to MongoDB..."+process.env.MONGODB_URI);
connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit on DB connection failure
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[ERROR] Unhandled error:', err.stack || err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});