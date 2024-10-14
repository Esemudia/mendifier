import { Request, Response } from 'express';
import HireRequest from '../models/HireRequest';

class HireRequestController {
  async requestHire(req: Request, res: Response): Promise<void> {
    const { jobId, message } = req.body;
    const userId = req.user?.id; // Assuming `req.user` is populated

    try {
      const hireRequest = await HireRequest.create({
        jobId,
        requestedBy: userId,
        message,
        status: 'pending',
      });

      res.status(201).json(hireRequest);
    } catch (error) {
      res.status(500).json({ message: 'Error creating hire request', error });
    }
  }

  async getHireRequestsForJob(req: Request, res: Response): Promise<void> {
    const { jobId } = req.params;

    try {
      const hireRequests = await HireRequest.find({ jobId }).populate('requestedBy', 'name email');
      res.json(hireRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching hire requests', error });
    }
  }

  async updateHireRequestStatus(req: Request, res: Response): Promise<void> {
    const { requestId } = req.params;
    const { status } = req.body; // Accepted values: 'accepted', 'declined'

    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    try {
      const hireRequest = await HireRequest.findByIdAndUpdate(requestId, { status }, { new: true });
      if (!hireRequest) return res.status(404).json({ message: 'Hire request not found' });

      res.json(hireRequest);
    } catch (error) {
      res.status(500).json({ message: 'Error updating hire request', error });
    }
  }
}

export default new HireRequestController();
