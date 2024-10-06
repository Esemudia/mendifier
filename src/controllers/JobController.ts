import { Request, Response } from 'express';
import Job from '../models/Job';

class JobController {
  async createJob(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;
    const userId = req.user?.id; 

    try {
      const job = await Job.create({ title, description, createdBy: userId });
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ message: 'Error creating job', error });
    }
  }

  async getJobs(req: Request, res: Response): Promise<void> {
    try {
      const jobs = await Job.find().populate('createdBy', 'name email');
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error });
    }
  }

  async updateJob(req: Request, res: Response): Promise<void> {
    const { jobId } = req.params;
    const { title, description } = req.body;

    try {
      const job = await Job.findByIdAndUpdate(jobId, { title, description }, { new: true });
      if (!job) return res.status(404).json({ message: 'Job not found' });

      res.json(job);
    } catch (error) {
      res.status(500).json({ message: 'Error updating job', error });
    }
  }
}

export default new JobController();
