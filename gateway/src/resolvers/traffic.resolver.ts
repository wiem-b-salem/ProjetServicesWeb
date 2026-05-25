import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Zone, CreateZoneInput, UpdateDensityInput } from '../types/traffic.types';
import { get, post, patch, SERVICES } from '../http.service';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver()
export class TrafficResolver {
  // public
  @Query(() => [Zone])
  async zones() {
    return get(`${SERVICES.traffic}/zones`);
  }

  // public
  @Query(() => [Zone])
  async congestedZones() {
    return get(`${SERVICES.traffic}/zones/congested`);
  }

  // ADMIN only
  @Roles('ADMIN')
  @Mutation(() => Zone)
  async createZone(@Args('input') input: CreateZoneInput) {
    return post(`${SERVICES.traffic}/zones`, input);
  }

  // ADMIN only
  @Roles('ADMIN')
  @Mutation(() => Zone)
  async updateDensity(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDensityInput,
  ) {
    return patch(`${SERVICES.traffic}/zones/${id}/density`, input);
  }
}