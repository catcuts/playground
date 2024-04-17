import { NestFactory } from '@nestjs/core';
import { ExampleInjectServiceIntoDecoratorModule } from './example-inject-service-into-decorator.module';

async function bootstrap() {
  const app = await NestFactory.create(ExampleInjectServiceIntoDecoratorModule);
  await app.listen(3000);
}
bootstrap();
