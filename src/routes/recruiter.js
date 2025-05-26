import express from 'express';
import RecruiterController from '../controllers/recruiterController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// View candidates recruited by the recruiter
router.get('/candidates', auth.authenticateJWT, (req, res) => RecruiterController.viewCandidates(req, res));

// Approve a candidate
router.post('/candidates/:id/approve', auth.authenticateJWT, (req, res) => RecruiterController.approveCandidate(req, res));

// Reject a candidate
router.post('/candidates/:id/reject', auth.authenticateJWT, (req, res) => RecruiterController.rejectCandidate(req, res));

export default router;