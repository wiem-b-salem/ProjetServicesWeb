import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Vehicle, GpsPosition, CreateVehicleInput, CreateGpsInput } from '../types/vehicle.types';
import { get, post, SERVICES } from '../http.service';

@Resolver()
export class VehicleResolver {
  @Query(() => [Vehicle], { description: 'Get all vehicles' })
  async vehicles() {
    return get(`${SERVICES.vehicle}/vehicles`);
  }

  @Query(() => Vehicle, { description: 'Get vehicle by ID' })
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return get(`${SERVICES.vehicle}/vehicles/${id}`);
  }

  @Mutation(() => Vehicle, { description: 'Add a new vehicle' })
  async addVehicle(@Args('input') input: CreateVehicleInput) {
    return post(`${SERVICES.vehicle}/vehicles`, input);
  }

  @Mutation(() => GpsPosition, { description: 'Add GPS position to vehicle' })
  async addGpsPosition(
    @Args('vehicle_id', { type: () => Int }) vehicle_id: number,
    @Args('input') input: CreateGpsInput,
  ) {
    return post(`${SERVICES.vehicle}/vehicles/${vehicle_id}/gps`, input);
  }

  @Query(() => [GpsPosition], { description: 'Get vehicle movement history' })
  async vehicleHistory(@Args('vehicle_id', { type: () => Int }) vehicle_id: number) {
    return get(`${SERVICES.vehicle}/vehicles/${vehicle_id}/history`);
  }
}