import { MailService } from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';


@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('SGMAILER')
    private readonly sgMail: MailService
  ) { }

  async sendEmailInvite(email: string) {
    const portalAppBaseUrl = this.configService.get('BASE_URL');

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      templateId: process.env.WELCOME_TEMPLATE_ID,
      dynamicTemplateData: {
        inviteURL: portalAppBaseUrl,
      }
    };

    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
  
  async sendVerificationEmail(email: string) {
    const portalAppBaseUrl = this.configService.get('BASE_URL');
    
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      templateId: process.env.VERIFY_EMAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        inviteURL: portalAppBaseUrl,
      }
    };
    
    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  async sendPasswordChangeEmail(email: string) {
    const portalAppBaseUrl = this.configService.get('BASE_URL');
    
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      templateId: process.env.PASSWORD_CHANGE_TEMPLATE_ID,
      dynamicTemplateData: {
        inviteURL: portalAppBaseUrl,
      }
    };
    
    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
}
