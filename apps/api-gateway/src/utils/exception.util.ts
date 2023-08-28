import { HttpException, HttpStatus } from '@nestjs/common';

export const CustomError = (status: HttpStatus, error: string) => {
  throw new HttpException({ success: false, status, error }, status, {
    cause: error,
  });
};
