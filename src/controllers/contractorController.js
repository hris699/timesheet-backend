import Timesheet from '../models/Timesheet.js';

class ContractorController {
    async submitTimesheet(req, res) {
        const { projectId, weekEnding, hours, notes } = req.body;
        const contractorId = req.user.id; // User ID from JWT

        try {
            // Validate input
            if (!projectId || !weekEnding || typeof hours !== 'number') {
                return res.status(400).json({ message: 'projectId, weekEnding, and hours are required.' });
            }

            // Create a new timesheet entry
            const newTimesheet = await Timesheet.create({
                contractorId,
                projectId,
                weekEnding,
                hours,
                notes,
                status: 'pending',
                createdAt: new Date(),
            });

            return res.status(201).json({ message: 'Timesheet submitted successfully.', timesheet: newTimesheet });
        } catch (error) {
            return res.status(500).json({ message: 'Error submitting timesheet.', error: error.message });
        }
    }

    async getTimesheets(req, res) {
        try {
            const contractorId = req.user.id; // User ID from JWT
            const timesheets = await Timesheet.find({ contractorId: contractorId });
            res.status(200).json(timesheets);
        } catch (error) {
            console.error('[ERROR] Fetching timesheets:', error);
            res.status(500).json({ message: 'Error fetching timesheets.', error: error.message });
        }
    }
}

export default new ContractorController();