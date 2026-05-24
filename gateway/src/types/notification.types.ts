import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@ObjectType()
export class Notification {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  message: string;

  @Field()
  is_read: boolean;
}

@InputType()
export class CreateNotificationInput {
  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @IsPositive({ message: 'User ID must be positive' })
  user_id: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Message cannot be empty' })
  message: string;
}