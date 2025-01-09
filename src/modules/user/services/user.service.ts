import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserGraphQLService } from 'src/graphql/services/user.graphql.service';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma, User } from '@prisma/client';
import { CreateUserInput, User } from 'src/graphql/types/user.types';
@Injectable()
export class UserService {
  //   constructor(private readonly prisma: PrismaService) {}

  //   async getUserById(
  //     userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  //   ): Promise<User | null> {
  //     return this.prisma.user.findUnique({
  //       where: userWhereUniqueInput,
  //     });
  //   }

  //   async getAllUsers(params: {
  //     skip?: number;
  //     take?: number;
  //     cursor?: Prisma.UserWhereUniqueInput;
  //     orderBy?: Prisma.UserOrderByWithRelationInput;
  //   }): Promise<User[]> {
  //     const { skip, take, cursor, orderBy } = params;
  //     return this.prisma.user.findMany({
  //       skip,
  //       take,
  //       cursor,
  //       orderBy,
  //     });
  //   }

  //   async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //     try {
  //       return this.prisma.user.create({ data });
  //     } catch (error) {
  //       throw new HttpException(
  //         'Something went wrong',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }

  //   async updateUser(params: {
  //     where: Prisma.UserWhereUniqueInput;
  //     data: Prisma.UserUpdateInput;
  //   }): Promise<User> {
  //     const { where, data } = params;
  //     return this.prisma.user.update({
  //       data,
  //       where,
  //     });
  //   }

  //   async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //     return this.prisma.user.delete({ where });
  //   }
  constructor(private readonly userGraphqlService: UserGraphQLService) {}
  async createUser(data: CreateUserInput): Promise<User> {
    return this.userGraphqlService.createUser(data);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userGraphqlService.getUsers();
  }

  async getUserById(id: number): Promise<User> {
    return this.userGraphqlService.getUserById(id);
  }

 
  async createUserWithPosts(data: {
    name: string;
    email: string;
    posts: Array<{
      title: string;
      content?: string;
      published?: boolean;
    }>;
  }): Promise<User> {
    return this.userGraphqlService.createUserWithPosts(data);
  }
}
