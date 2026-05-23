import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Incident {
  @Field(() => Int)
  id: number;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field()
  description: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}