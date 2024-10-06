import nodemailer from 'nodemailer';
import Pusher from 'pusher';
import dotenv from 'dotenv';

dotenv.config();

// Nodemailer configuration
const mailTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Pusher configuration
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || '',
  useTLS: true,
});

class NotificationService {
  async sendEmail(recipient: string, subject: string, message: string): Promise<void> {
    await mailTransport.sendMail({
      from: `"Campaigns" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });
  }

  async sendPushNotification(channel: string, event: string, data: object): Promise<void> {
    await pusher.trigger(channel, event, data);
  }
}

export default new NotificationService();
