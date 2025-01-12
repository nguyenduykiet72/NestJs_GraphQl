export interface MyContext {
    user?: {
      id: number;
      email: string;
      roles?: string[];
    };
    token?: string;
  }