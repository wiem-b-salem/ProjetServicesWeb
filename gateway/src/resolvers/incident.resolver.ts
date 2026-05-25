import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Incident, CreateIncidentInput, UpdateStatusInput } from '../types/incident.types';
import { get, post, patch, SERVICES } from '../http.service';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver()
export class IncidentResolver {
  // public
  @Query(() => [Incident])
  async incidents() {
    return get(`${SERVICES.incident}/incidents`);
  }

  // public
  @Query(() => Incident)
  async incident(@Args('id', { type: () => Int }) id: number) {
    return get(`${SERVICES.incident}/incidents/${id}`);
  }

  // ADMIN + OPERATOR
  @Roles('ADMIN', 'OPERATOR')
  @Mutation(() => Incident)
  async createIncident(@Args('input') input: CreateIncidentInput) {
    return post(`${SERVICES.incident}/incidents`, input);
  }

  // ADMIN + OPERATOR
  @Roles('ADMIN', 'OPERATOR')
  @Mutation(() => Incident)
  async updateIncidentStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateStatusInput,
  ) {
    return patch(`${SERVICES.incident}/incidents/${id}/status`, input);
  }
}