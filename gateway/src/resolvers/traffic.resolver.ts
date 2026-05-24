import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Zone, CreateZoneInput, UpdateDensityInput } from '../types/traffic.types';
import { get, post, patch, SERVICES } from '../http.service';

@Resolver()
export class TrafficResolver {
  @Query(() => [Zone], { description: 'Get all zones' })
  async zones() {
    return get(`${SERVICES.traffic}/zones`);
  }

  @Query(() => [Zone], { description: 'Get congested zones' })
  async congestedZones() {
    return get(`${SERVICES.traffic}/zones/congested`);
  }

  @Mutation(() => Zone, { description: 'Create a new zone' })
  async createZone(@Args('input') input: CreateZoneInput) {
    return post(`${SERVICES.traffic}/zones`, input);
  }

  @Mutation(() => Zone, { description: 'Update zone traffic density' })
  async updateDensity(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDensityInput,
  ) {
    return patch(`${SERVICES.traffic}/zones/${id}/density`, input);
  }
}