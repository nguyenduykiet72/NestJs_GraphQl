import { Post } from './post.entity';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  posts?: Post[];
}
