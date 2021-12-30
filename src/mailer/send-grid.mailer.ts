import * as sgMail from '@sendgrid/mail';
import { ConfigService } from "@nestjs/config"

export const SendGridMailer = {
  provide: 'SGMAILER',
  useFactory: async (configService: ConfigService) => {
    sgMail.setApiKey(configService.get('SENDGRID_API_KEY'))
    return sgMail
  },
  inject: [ConfigService],
}
