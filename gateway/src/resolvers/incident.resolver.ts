import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Incident } from '../types/incident.types';
import { get, post, patch, SERVICES } from '../http.service';

@Resolver()
export class IncidentResolver {
  @Query(() => [Incident])
  async incidents() {
    return get(`${SERVICES.incident}/incidents`);
  }

  @Query(() => Incident)
  async incident(@Args('id', { type: () => Int }) id: number) {
    return get(`${SERVICES.incident}/incidents/${id}`);
  }

  @Mutation(() => Incident)
  async createIncident(
    @Args('type') type: string,
    @Args('description') description: string,
    @Args('latitude', { type: () => Float }) latitude: number,
    @Args('longitude', { type: () => Float }) longitude: number,
    @Args('reported_by', { type: () => Int, nullable: true }) reported_by?: number,
  ) {
    return post(`${SERVICES.incident}/incidents`, {
      type, description, latitude, longitude, reported_by,
    });
  }

  @Mutation(() => Incident)
  async updateIncidentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status') status: string,
  ) {
    return patch(`${SERVICES.incident}/incidents/${id}/status`, { status });
  }
}