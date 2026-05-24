import { ObjectType, Field, Int, Float, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum IncidentType {
  ACCIDENT = 'Accident',
  TRAVAUX = 'Travaux',
  ROUTE_FERMEE = 'Route fermée',
  EMBOUTEILLAGE = 'Embouteillage',
}

export enum IncidentStatus {
  SIGNALE = 'Signalé',
  EN_COURS = 'En cours',
  RESOLU = 'Résolu',
}

registerEnumType(IncidentType, {
  name: 'IncidentType',
  description: 'Type of incident',
});

registerEnumType(IncidentStatus, {
  name: 'IncidentStatus',
  description: 'Status of incident',
});

@ObjectType()
export class Incident {
  @Field(() => Int)
  id: number;

  @Field(() => IncidentType)
  type: IncidentType;

  @Field(() => IncidentStatus)
  status: IncidentStatus;

  @Field()
  description: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}

@InputType()
export class CreateIncidentInput {
  @Field(() => IncidentType)
  @IsEnum(IncidentType, { message: 'Invalid incident type' })
  type: IncidentType;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Type(() => Number)
  reported_by?: number;
}

@InputType()
export class UpdateStatusInput {
  @Field(() => IncidentStatus)
  @IsEnum(IncidentStatus, { message: 'Invalid status' })
  status: IncidentStatus;
}