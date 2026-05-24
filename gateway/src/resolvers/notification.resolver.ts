import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Notification, CreateNotificationInput } from '../types/notification.types';
import { get, post, patch, SERVICES } from '../http.service';

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification], { description: 'Get notifications for a user' })
  async notifications(@Args('user_id', { type: () => Int }) user_id: number) {
    return get(`${SERVICES.notification}/notifications/user/${user_id}`);
  }

  @Mutation(() => Notification, { description: 'Send a notification' })
  async sendNotification(@Args('input') input: CreateNotificationInput) {
    return post(`${SERVICES.notification}/notifications`, input);
  }

  @Mutation(() => Notification, { description: 'Mark notification as read' })
  async markNotificationRead(@Args('id', { type: () => Int }) id: number) {
    return patch(`${SERVICES.notification}/notifications/${id}/read`);
  }
}