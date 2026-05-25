import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Vehicle, GpsPosition, CreateVehicleInput, CreateGpsInput } from '../types/vehicle.types';
import { get, post, SERVICES } from '../http.service';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver()
export class VehicleResolver {
  // public
  @Query(() => [Vehicle])
  async vehicles() {
    return get(`${SERVICES.vehicle}/vehicles`);
  }

  // public
  @Query(() => Vehicle)
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return get(`${SERVICES.vehicle}/vehicles/${id}`);
  }

  // ADMIN + OPERATOR
  @Roles('ADMIN', 'OPERATOR')
  @Mutation(() => Vehicle)
  async addVehicle(@Args('input') input: CreateVehicleInput) {
    return post(`${SERVICES.vehicle}/vehicles`, input);
  }

  // ADMIN + OPERATOR
  @Roles('ADMIN', 'OPERATOR')
  @Mutation(() => GpsPosition)
  async addGpsPosition(
    @Args('vehicle_id', { type: () => Int }) vehicle_id: number,
    @Args('input') input: CreateGpsInput,
  ) {
    return post(`${SERVICES.vehicle}/vehicles/${vehicle_id}/gps`, input);
  }

  // public
  @Query(() => [GpsPosition])
  async vehicleHistory(@Args('vehicle_id', { type: () => Int }) vehicle_id: number) {
    return get(`${SERVICES.vehicle}/vehicles/${vehicle_id}/history`);
  }
}