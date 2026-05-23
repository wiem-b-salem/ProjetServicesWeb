import { ObjectType, Field, InputType } from '@nestjs/graphql';

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
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role?: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}