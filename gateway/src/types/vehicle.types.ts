import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => Int)
  id: number;

  @Field()
  plate: string;

  @Field()
  type: string;

  @Field(() => Int)
  ownerId: number;
}

@ObjectType()
export class GpsPosition {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  recordedAt: Date;
}