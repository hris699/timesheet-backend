import { Router } from 'express';
import Timesheet from '../models/Timesheet.js';
import AdminController from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const router = Router();
const adminController = new AdminController(Timesheet);

// Route to view all timesheets
router.get('/timesheets', auth.authenticateJWT, (req, res) => adminController.viewAllTimesheets(req, res));

// Route to export reports
router.get('/export', auth.authenticateJWT, (req, res) => adminController.exportReports(req, res));


// Route to create a new project
router.post('/projects', auth.authenticateJWT, (req, res) => adminController.createProject(req, res));


// Route to view all projects   
router.get('/projects', auth.authenticateJWT, (req, res) => adminController.viewAllProjects(req, res));


export default router;