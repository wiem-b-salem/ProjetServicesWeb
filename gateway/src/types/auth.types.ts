import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['ADMIN', 'OPERATOR'], { message: 'Role must be ADMIN or OPERATOR' })
  role?: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}