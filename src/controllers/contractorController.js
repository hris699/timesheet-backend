import Timesheet from '../models/Timesheet.js';

class ContractorController {
    async submitTimesheet(req, res) {
        const { projectId, weekEnding, hours, notes } = req.body;
        const contractorId = req.user.id; 

        try {
            if (!projectId || !weekEnding || typeof hours !== 'number') {
                return res.status(400).json({ message: 'projectId, weekEnding, and hours are required.' });
            }

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
}

export default new ContractorController();