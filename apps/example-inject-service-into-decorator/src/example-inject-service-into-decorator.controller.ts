import { Controller, Get } from '@nestjs/common';
import { ExampleInjectServiceIntoDecoratorService } from './example-inject-service-into-decorator.service';

@Controller()
export class ExampleInjectServiceIntoDecoratorController {
  constructor(private readonly exampleInjectServiceIntoDecoratorService: ExampleInjectServiceIntoDecoratorService) {}

  @Get()
  getHello(): string {
    return this.exampleInjectServiceIntoDecoratorService.getHello();
  }
}
