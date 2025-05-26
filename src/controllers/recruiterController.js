import User from '../models/User.js'; 
import Timesheet from '../models/Timesheet.js'; 

class RecruiterController {
    async viewCandidates(req, res) {
        try {
            const recruiterId = req.user.id; 
            const candidates = await User.find({ recruiter: recruiterId }); 
            res.status(200).json(candidates);
        } catch (error) {
            console.error(`[ERROR] Fetching candidates for recruiter ${req.user.id}:`, error);
            res.status(500).json({ message: 'Error fetching candidates', error: error.message });
        }
    }

    async approveCandidate(req, res) {
        try {
            const { id } = req.params;
            const candidate = await User.findById(id);
            const timesheet = await Timesheet.findOne({ contractorId: candidate.id });
            if (!candidate || candidate.recruiter.toString() !== req.user.id) {
                console.warn(`[WARN] Unauthorized approve attempt by recruiter ${req.user.id} for candidate ${id}`);
                return res.status(403).json({ message: 'Unauthorized action' });
            }
            timesheet.status = 'approved'; 
            await timesheet.save();
            res.status(200).json({ message: 'Candidate approved successfully', candidate });
        } catch (error) {
            console.error(`[ERROR] Approving candidate ${req.params.id} by recruiter ${req.user.id}:`, error);
            res.status(500).json({ message: 'Error approving candidate', error: error.message });
        }
    }

    async rejectCandidate(req, res) {
        try {
            const { id } = req.params;
            const candidate = await User.findById(id);
            if (!candidate || candidate.recruiter.toString() !== req.user.id) {
                console.warn(`[WARN] Unauthorized reject attempt by recruiter ${req.user.id} for candidate ${id}`);
                return res.status(403).json({ message: 'Unauthorized action' });
            }
            candidate.status = 'rejected'; 
            await candidate.save();
            res.status(200).json({ message: 'Candidate rejected successfully', candidate });
        } catch (error) {
            console.error(`[ERROR] Rejecting candidate ${req.params.id} by recruiter ${req.user.id}:`, error);
            res.status(500).json({ message: 'Error rejecting candidate', error: error.message });
        }
    }
}

export default new RecruiterController();