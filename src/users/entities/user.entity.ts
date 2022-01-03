import { Post } from 'src/posts/posts.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

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
  status: UserStatus;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @ManyToOne(type => Post, post => post.user, { eager: true })
  @JoinTable({ name: 'Posts' })
  posts: Post[];

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: string;
}
