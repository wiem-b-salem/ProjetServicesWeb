import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Notification } from '../types/notification.types';
import { get, post, patch, SERVICES } from '../http.service';

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification])
  async notifications(@Args('user_id', { type: () => Int }) user_id: number) {
    return get(`${SERVICES.notification}/notifications/user/${user_id}`);
  }

  @Mutation(() => Notification)
  async sendNotification(
    @Args('user_id', { type: () => Int }) user_id: number,
    @Args('message') message: string,
  ) {
    return post(`${SERVICES.notification}/notifications`, { user_id, message });
  }

  @Mutation(() => Notification)
  async markNotificationRead(@Args('id', { type: () => Int }) id: number) {
    return patch(`${SERVICES.notification}/notifications/${id}/read`);
  }
}