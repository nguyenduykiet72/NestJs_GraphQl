// import { Injectable } from '@nestjs/common';
// import { UserGraphQLService } from 'src/graphql/services/user.graphql.service';
// import { CreateUserInput, User } from 'src/graphql/types/user.types';
// @Injectable()
// export class UserService {
//   constructor(private readonly userGraphqlService: UserGraphQLService) {}
//   async createUser(data: CreateUserInput): Promise<User> {
//     return this.userGraphqlService.createUser(data);
//   }

//   async getAllUsers(): Promise<User[]> {
//     return this.userGraphqlService.getUsers();
//   }

//   async getUserById(id: number): Promise<User> {
//     return this.userGraphqlService.getUserById(id);
//   }

//   async createUserWithPosts(data: {
//     name: string;
//     email: string;
//     posts: Array<{
//       title: string;
//       content?: string;
//       published?: boolean;
//     }>;
//   }): Promise<User> {
//     return this.userGraphqlService.createUserWithPosts(data);
//   }
// }

import { Injectable } from '@nestjs/common';
import { Posts, Users, Users_Insert_Input } from 'src/generated/graphql';
import { UserGraphQLService } from 'src/graphql/services/user.graphql.service';

@Injectable()
export class UserService {
  constructor(private readonly userGraphqlService: UserGraphQLService) {}

  async getAllUsers(): Promise<Users[]> {
    const users = await this.userGraphqlService.getUsers();
    return users.map((user) => ({
      ...user,
      posts: (user.posts || []).map((post) => ({
        ...post,
        user: user, // Thêm reference ngược lại user
      })) as Posts[],
      posts_aggregate: {
        aggregate: null,
        nodes: (user.posts || []).map((post) => ({
          ...post,
          user: user, // Thêm reference ngược lại user
        })) as Posts[],
      },
    }));
  }

  async getUserById(id: number): Promise<Users | null> {
    const user = await this.userGraphqlService.getUserById(id);
    if (!user) return null;
    return {
      ...user,
      posts: (user.posts || []).map((post) => ({
        ...post,
        user: user,
      })) as Posts[],
      posts_aggregate: {
        aggregate: null,
        nodes: (user.posts || []).map((post) => ({
          ...post,
          user: user,
        })) as Posts[],
      },
    };
  }

  async createUser(data: Users_Insert_Input): Promise<Users> {
    const user = await this.userGraphqlService.createUser(data);
    return {
      ...user,
      posts: [],
      posts_aggregate: {
        aggregate: null,
        nodes: [],
      },
    };
  }

  async registerUser(data: Users_Insert_Input): Promise<Users> {
    const user = await this.userGraphqlService.registerUser(data);
    return {
      ...user,
      posts: [],
      posts_aggregate: {
        aggregate: null,
        nodes: [],
      },
    };
  }
}
