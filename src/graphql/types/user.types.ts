export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  posts?: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  insert_users_one: User;
}

export interface CreateUserWithPostsResponse {
  insert_users_one: User;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserOutput {
  id: number;
  name: string;
  email: string;
  accessToken: string;
}

export interface CreatePostInput {
  title: string;
  content?: string;
  published?: boolean;
  author_id: number;
}

export interface CreatePostResponse {
  insert_posts_one: Post;
}

export interface RegisterUserResponse {
  insert_users_one: User;
}
