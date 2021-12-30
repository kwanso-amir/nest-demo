import { EntitySubscriberInterface, EventSubscriber, InsertEvent, Connection, UpdateEvent } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { MailerService } from 'src/mailer/mailer.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly connection: Connection,
    private readonly mailerService: MailerService
  ) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    event.entity.password = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    const emailGotUpdated = event.updatedColumns.find(value => value.propertyName, User.prototype.email);
    const passwordGotUpdated = event.updatedColumns.find(value => value.propertyName, User.prototype.password);
    const {email, password} = event.entity
    if (emailGotUpdated) {
      if (event.databaseEntity.email !== email) {
        event.entity.status = 0;
        
        this.mailerService.sendVerificationEmail(email)
      }
    }
    if (passwordGotUpdated && password) {
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
      if (event.databaseEntity.password !== password) {
        this.mailerService.sendPasswordChangeEmail(email)
        event.entity.password = hashedPassword;
      }
    }
  }
}