import { Exclude, Transform } from 'class-transformer';
import { Post } from 'src/posts/posts.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Role } from './role.entity';

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

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE, })
  @Transform(({ value }) => UserStatus[value]  )
  status: UserStatus;

  @Column({ nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  roleId: string;

  @Exclude()
  @OneToMany(() => Post, post => post.user, { eager: true })
  posts: Post[];

  @ManyToOne(() => Role, role => role.users, { eager: true })
  @Transform(({ value }) => value.role  )
  role: Role;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
