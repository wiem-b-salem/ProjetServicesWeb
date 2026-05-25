import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthResponse, RegisterInput, LoginInput } from '../types/auth.types';
import { post, SERVICES } from '../http.service';

@Resolver()
export class AuthResolver {
  // public - no roles needed
  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput) {
    return post(`${SERVICES.auth}/auth/register`, input);
  }

  // public - no roles needed
  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return post(`${SERVICES.auth}/auth/login`, input);
  }
}