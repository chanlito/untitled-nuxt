import fs from 'fs';
import { promisify } from 'util';
import mjml2html from 'mjml';
import nodemailer, { SendMailOptions } from 'nodemailer';
import path from 'path';
import format from 'string-template';
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

  async sendMailTemplate(
    to: string,
    subject: string,
    mjmlFileName: string,
    metadata: { [key: string]: string },
  ) {
    const mjml = format(
      await promisify(fs.readFile)(
        path.resolve('templates', `${mjmlFileName}.mjml`),
        'utf-8',
      ),
      metadata,
    );
    const { html, errors } = mjml2html(mjml, {
      minify: true,
      validationLevel: 'strict',
      filePath: path.resolve('templates', 'includes'),
    });
    if (errors.length > 0) return false;
    return this.sendMail({ to, subject, html });
  }
}

type MailerSendMailOptions = Pick<
  SendMailOptions,
  'subject' | 'to' | 'html' | 'text'
>;
