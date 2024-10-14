import { Request, Response } from 'express';
import Provider from '../models/R_Provider';

class RatingController {
  async addRating(req: Request, res: Response): Promise<void> {
    const { providerId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Rating must be between 1 and 5' });
      return;
    }

    try {
      const provider = await Provider.findById(providerId);
      if (!provider) {
        res.status(404).json({ message: 'Provider not found' });
        return;
      }

      provider.ratings.push(rating);
      provider.calculateAverageRating();
      await provider.save();

      res.json({ message: 'Rating added successfully', averageRating: provider.averageRating });
    } catch (error) {
      res.status(500).json({ message: 'Error adding rating', error });
    }
  }
}

export default new RatingController();
