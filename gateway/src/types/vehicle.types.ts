import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt, IsPositive, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

@ObjectType()
export class Vehicle {
  @Field(() => Int)
  id: number;

  @Field()
  plate: string;

  @Field()
  type: string;

  @Field(() => Int)
  owner_id: number;
}

@ObjectType()
export class GpsPosition {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Int)
  vehicle_id: number;

  @Field()
  recorded_at: Date;
}

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Plate cannot be empty' })
  plate: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Type cannot be empty' })
  type: string;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @IsPositive({ message: 'Owner ID must be positive' })
  owner_id: number;
}

@InputType()
export class CreateGpsInput {
  @Field(() => Float)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}