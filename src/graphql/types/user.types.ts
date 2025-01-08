export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  authorId: number;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  insert_User_one: User;
}

export interface CreateUserWithPostsResponse {
  insert_User_one: User;
}
