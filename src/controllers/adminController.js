import Project from '../models/Project.js';
import { Parser as Json2csvParser } from 'json2csv';

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

    async viewAllProjects(req, res) {
        try {
            const projects = await Project.find({});
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving projects', error });
        }
    }

        async exportReports(req, res) {
        try {
            const timesheets = await this.timesheetModel.find({}).lean();
            const fields = Object.keys(timesheets[0] || {});
            const json2csvParser = new Json2csvParser({ fields });
            const csv = json2csvParser.parse(timesheets);

            res.header('Content-Type', 'text/csv');
            res.attachment('timesheet_reports.csv');
            res.status(200).send(csv);
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