import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Vehicle, GpsPosition } from '../types/vehicle.types';
import { get, post, SERVICES } from '../http.service';

@Resolver()
export class VehicleResolver {
  @Query(() => [Vehicle])
  async vehicles() {
    return get(`${SERVICES.vehicle}/vehicles`);
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return get(`${SERVICES.vehicle}/vehicles/${id}`);
  }

  @Mutation(() => Vehicle)
  async addVehicle(
    @Args('plate') plate: string,
    @Args('type') type: string,
    @Args('owner_id', { type: () => Int }) owner_id: number,
  ) {
    return post(`${SERVICES.vehicle}/vehicles`, { plate, type, owner_id });
  }

  @Mutation(() => GpsPosition)
  async addGpsPosition(
    @Args('vehicle_id', { type: () => Int }) vehicle_id: number,
    @Args('latitude', { type: () => Float }) latitude: number,
    @Args('longitude', { type: () => Float }) longitude: number,
  ) {
    return post(`${SERVICES.vehicle}/vehicles/${vehicle_id}/gps`, { latitude, longitude });
  }

  @Query(() => [GpsPosition])
  async vehicleHistory(@Args('vehicle_id', { type: () => Int }) vehicle_id: number) {
    return get(`${SERVICES.vehicle}/vehicles/${vehicle_id}/history`);
  }
}