import { HttpException, HttpStatus } from '@nestjs/common';

export class GraphQLException extends HttpException {
  constructor(error: any) {
    const message =
      error.response?.errors?.[0]?.message ||
      'Error while fetching data from GraphQL';
    const statusCode = HttpStatus.BAD_REQUEST;
    super({ message, error }, statusCode);
  }
}
