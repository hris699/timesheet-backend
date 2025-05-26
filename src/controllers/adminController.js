import Project from '../models/Project.js';

class AdminController {
    constructor(timesheetModel) {
        this.timesheetModel = timesheetModel;
    }

    async viewAllTimesheets(req, res) {
        try {
            const timesheets = await this.timesheetModel.find({});
            res.status(200).json(timesheets);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving timesheets', error });
        }
    }

    async exportReports(req, res) {
        try {
            const timesheets = await this.timesheetModel.find({});
            // Logic to export reports (e.g., to CSV) would go here
            res.status(200).json({ message: 'Reports exported successfully', data: timesheets });
        } catch (error) {
            res.status(500).json({ message: 'Error exporting reports', error });
        }
    }

    async createProject(req, res) {
        const { name, description } = req.body;
        try {
            const project = new Project({ name, description });
            await project.save();
            res.status(201).json({ message: 'Project created successfully', project });
        } catch (error) {
            console.log(`[ERROR] Error creating project: ${error}`);
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Project name already exists' });
            }
            res.status(500).json({ message: 'Error creating project', error });
        }
    }
}

export default AdminController;