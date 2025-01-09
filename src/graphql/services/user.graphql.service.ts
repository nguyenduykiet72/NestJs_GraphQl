import { Inject, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import {
  CreateUserInput,
  CreateUserResponse,
  CreateUserWithPostsResponse,
  RegisterUserInput,
  RegisterUserResponse,
  User,
} from '../types/user.types';
import {
  CREATE_USER,
  CREATE_USER_WITH_POSTS,
  REGISTER_USER,
} from '../mutations/user.mutations';
import { GET_USER_BY_ID, GET_USERS } from '../queries/user.queries';
import { GraphQLException } from '../exception/graphql.exception';

@Injectable()
export class UserGraphQLService {
  constructor(
    @Inject('GRAPHQL_CLIENT') private readonly client: GraphQLClient,
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const response = await this.client.request<CreateUserResponse>(
        CREATE_USER,
        input,
      );
      return response.insert_users_one;
    } catch (error) {
      throw new GraphQLException(error);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await this.client.request<{ User: User[] }>(GET_USERS);
      return response.User;
    } catch (error) {
      throw new GraphQLException(error);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await this.client.request<{ User: User }>(
        GET_USER_BY_ID,
        {
          id,
        },
      );
      return response.User;
    } catch (error) {
      throw new GraphQLException(error);
    }
  }

  async createUserWithPosts(input: {
    name: string;
    email: string;
    posts: Array<{
      title: string;
      content?: string;
      published?: boolean;
    }>;
  }): Promise<User> {
    try {
      const response = await this.client.request<CreateUserWithPostsResponse>(
        CREATE_USER_WITH_POSTS,
        input,
      );
      return response.insert_users_one;
    } catch (error) {
      throw new GraphQLException(error);
    }
  }

  async registerUser(input: RegisterUserInput): Promise<User> {
    try {
      const response = await this.client.request<RegisterUserResponse>(
        REGISTER_USER,
        input,
      );
      return response.insert_users_one;
    } catch (error) {
      throw new GraphQLException(error);
    }
  }
}
