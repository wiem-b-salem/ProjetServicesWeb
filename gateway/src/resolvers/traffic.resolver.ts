import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Zone } from '../types/traffic.types';
import { get, post, patch, SERVICES } from '../http.service';

@Resolver()
export class TrafficResolver {
  @Query(() => [Zone])
  async zones() {
    return get(`${SERVICES.traffic}/zones`);
  }

  @Query(() => [Zone])
  async congestedZones() {
    return get(`${SERVICES.traffic}/zones/congested`);
  }

  @Mutation(() => Zone)
  async createZone(@Args('name') name: string) {
    return post(`${SERVICES.traffic}/zones`, { name });
  }

  @Mutation(() => Zone)
  async updateDensity(
    @Args('id', { type: () => Int }) id: number,
    @Args('density', { type: () => Float }) density: number,
  ) {
    return patch(`${SERVICES.traffic}/zones/${id}/density`, { density });
  }
}