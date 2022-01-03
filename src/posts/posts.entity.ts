import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

export enum PostStatus {
  UNPUBLISHED,
  PUBLISHED,
}

@Entity({ name: 'Posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.UNPUBLISHED, })
  status: PostStatus;

  @ManyToOne(type => User, user => user.posts)
  @JoinTable({ name: 'Users' })
  user: User;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: string;
}
