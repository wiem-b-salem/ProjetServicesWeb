import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field()
  created_at: Date;
}