import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Zone {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  density: number;

  @Field()
  level: string;

  @Field()
  updated_at: Date;
}