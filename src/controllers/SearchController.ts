import { Request, Response } from 'express';
import Provider from '../models/Provider';
import Service from '../models/Service';

class SearchController {
  async searchProviders(req: Request, res: Response): Promise<void> {
    const { serviceName } = req.query; 

    try {
      const service = await Service.findOne({ name: serviceName });
      if (!service) {
        res.status(404).json({ message: 'Service not found' });
        return;
      }

      const providers = await Provider.find({ services: service._id }).populate('services', 'name');
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching providers', error });
    }
  }
}

export default new SearchController();
