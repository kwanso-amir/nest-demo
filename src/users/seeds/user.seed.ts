import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";

import { Role } from '../entities/role.entity'
import { User } from '../entities/user.entity'
import { RolesData, UsersData } from './seed-data'
import { createPasswordHash } from "src/lib/helper";

@Injectable()
export class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //Add Roles
      let roles = await getRepository(Role).find();
      if (!roles.length) {
        roles = getRepository(Role).create(RolesData)
        roles = await queryRunner.manager.save(roles);
      }
      //Add Users
      const users = await getRepository(User).find();
      if (!users.length) {
        for (let index = 0; index < UsersData.length; index++) {
          const user = UsersData[index];
          user.password = await createPasswordHash(user.password);
          const UserObj = getRepository(User).create(user)
          await queryRunner.manager.save(UserObj);
        }
      }
      await queryRunner.commitTransaction();
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }

  }
}