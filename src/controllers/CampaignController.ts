import { Request, Response } from 'express';
import Campaign from '../models/Campaign';
import NotificationService from '../services/notification';

class CampaignController {
  async createCampaign(req: Request, res: Response): Promise<void> {
    const { subject, message, recipientEmail } = req.body;

    try {
      const campaign = await Campaign.create({ subject, message, sent: false });

      // Send email
      await NotificationService.sendEmail(recipientEmail, subject, message);

      // Send push notification
      await NotificationService.sendPushNotification('campaigns', 'new_campaign', { subject, message });

      // Mark campaign as sent
      campaign.sent = true;
      await campaign.save();

      res.status(201).json({ message: 'Campaign created and notifications sent', campaign });
    } catch (error) {
      res.status(500).json({ message: 'Error creating campaign', error });
    }
  }
}

export default new CampaignController();
