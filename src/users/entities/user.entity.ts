import { Transform } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

export enum UserStatus {
  DEACTIVATED = 0,
  ACTIVE,
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Transform(({ value }) => UserStatus[value])
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE, })
  status: UserStatus;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: string;
}
