import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Notification, CreateNotificationInput } from '../types/notification.types';
import { get, post, patch, SERVICES } from '../http.service';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver()
export class NotificationResolver {
  // ADMIN + OPERATOR
  @Roles('ADMIN', 'OPERATOR')
  @Query(() => [Notification])
  async notifications(@Args('user_id', { type: () => Int }) user_id: number) {
    return get(`${SERVICES.notification}/notifications/user/${user_id}`);
  }

  // ADMIN only
  @Roles('ADMIN')
  @Mutation(() => Notification)
  async sendNotification(@Args('input') input: CreateNotificationInput) {
    return post(`${SERVICES.notification}/notifications`, input);
  }

  // ADMIN + OPERATOR
  @Roles('ADMIN', 'OPERATOR')
  @Mutation(() => Notification)
  async markNotificationRead(@Args('id', { type: () => Int }) id: number) {
    return patch(`${SERVICES.notification}/notifications/${id}/read`);
  }
}