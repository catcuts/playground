import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleInjectServiceIntoDecoratorService {
  getHello(): string {
    return 'Hello World!';
  }
}
