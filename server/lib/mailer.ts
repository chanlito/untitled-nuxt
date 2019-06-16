import nodemailer, { SendMailOptions } from 'nodemailer';
import { Service } from 'typedi';

@Service()
export class Mailer {
  from = 'Untitled <untitled@mailinator.com>';

  transporter: nodemailer.Transporter;
  transporterConfig: nodemailer.TransportOptions;

  async createTransporter() {
    if (process.env.NODE_ENV === 'development') {
      const {
        smtp: { host, port, secure },
        user,
        pass,
      } = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
    } else {
      this.transporter = nodemailer.createTransport({
        // TODO: provide a production info here
      });
    }
    return this.transporter;
  }

  async sendMail(options: MailerSendMailOptions) {
    /**
     * Create a transporter before we can start sending mails.
     */
    if (!this.transporter) {
      this.transporter = await this.createTransporter();
    }

    const info = await this.transporter.sendMail({
      from: this.from,
      ...options,
    });
    console.log('Mail Sent! ✉️');

    const previewURL = nodemailer.getTestMessageUrl(info);
    if (previewURL) console.log('Preview URL: %s', previewURL);
  }
}

type MailerSendMailOptions = Pick<
  SendMailOptions,
  'subject' | 'to' | 'html' | 'text'
>;
