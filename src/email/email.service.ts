import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
  subject: string;
  email: string;
  name: string;
  activationCode: string;
  template: string;
};

type mailContactOptions = {
  subject: string;
  email: string;
  name: string;
  emailClient: string;
  phoneClient: string;
  nameClient: string;
  description: string;
  template: string;
};

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}
  async sendMail({
    subject,
    email,
    name,
    activationCode,
    template,
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activationCode,
      },
    });
  }

  async sendMailContact({
    subject,
    email,
    name,
    emailClient,
    nameClient,
    description,
    phoneClient,
    template,
  }: mailContactOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        nameClient,
        emailClient,
        description,
        phoneClient,
        name,
      },
    });
  }
}