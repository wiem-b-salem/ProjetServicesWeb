import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Incident, CreateIncidentInput, UpdateStatusInput } from '../types/incident.types';
import { get, post, patch, SERVICES } from '../http.service';

@Resolver()
export class IncidentResolver {
  @Query(() => [Incident], { description: 'Get all incidents' })
  async incidents() {
    return get(`${SERVICES.incident}/incidents`);
  }

  @Query(() => Incident, { description: 'Get incident by ID' })
  async incident(@Args('id', { type: () => Int }) id: number) {
    return get(`${SERVICES.incident}/incidents/${id}`);
  }

  @Mutation(() => Incident, { description: 'Create a new incident' })
  async createIncident(@Args('input') input: CreateIncidentInput) {
    return post(`${SERVICES.incident}/incidents`, input);
  }

  @Mutation(() => Incident, { description: 'Update incident status' })
  async updateIncidentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateStatusInput,
  ) {
    return patch(`${SERVICES.incident}/incidents/${id}/status`, input);
  }
}