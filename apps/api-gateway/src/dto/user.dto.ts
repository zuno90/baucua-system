import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Username must have at least 4 characters' })
  @MaxLength(20, { message: 'Username must have maximum 20 characters' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Password must have at least 4 characters' })
  @MaxLength(20, { message: 'Password must have maximum 20 characters' })
  password: string;
}
