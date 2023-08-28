import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http')
    return context.switchToHttp().getRequest().user;
  if (context.getType() === 'rpc') {
    console.log('rpc data', context.switchToRpc().getData());
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
