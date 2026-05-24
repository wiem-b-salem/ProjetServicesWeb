import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthResponse, RegisterInput, LoginInput } from '../types/auth.types';
import { post, SERVICES } from '../http.service';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse, { description: 'Register a new user' })
  async register(@Args('input') input: RegisterInput) {
    return post(`${SERVICES.auth}/auth/register`, input);
  }

  @Mutation(() => AuthResponse, { description: 'Login and get JWT token' })
  async login(@Args('input') input: LoginInput) {
    return post(`${SERVICES.auth}/auth/login`, input);
  }
}