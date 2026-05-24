import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

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
}

@InputType()
export class CreateZoneInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Zone name must be at least 2 characters' })
  name: string;
}

@InputType()
export class UpdateDensityInput {
  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Density cannot be negative' })
  density: number;
}