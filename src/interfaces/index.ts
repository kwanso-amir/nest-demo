import { Post } from 'src/posts/posts.entity';
import { UserStatus } from 'src/users/entities/user.entity';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

export interface PostResponseInterface {
  post?: Post;
  posts?: Post[];
  status: number;
  message: string;
}