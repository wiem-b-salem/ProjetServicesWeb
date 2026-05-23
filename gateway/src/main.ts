import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('ZE GATEWAY IS RUNNING ON PORT 3000 BALIZZZZZZZZZZZZZZZZZ');
  console.log('GraphQL playground(IL3ABYALLAH): http://localhost:3000/graphql');
}
bootstrap();