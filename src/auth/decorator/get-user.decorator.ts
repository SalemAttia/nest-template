import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from "../model/user.model";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Promise<User> => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );