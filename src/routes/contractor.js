import express from 'express';
import ContractorController from '../controllers/contractorController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Route for submitting a weekly timesheet
router.post('/timesheet', auth.authenticateJWT, (req, res) => ContractorController.submitTimesheet(req, res));

// Route for getting all submitted timesheets by the contractor
router.get('/timesheets', auth.authenticateJWT, (req, res) => ContractorController.getTimesheets(req, res));

export default router;