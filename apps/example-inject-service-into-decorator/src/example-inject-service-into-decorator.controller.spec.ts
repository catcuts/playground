import { Test, TestingModule } from '@nestjs/testing';
import { ExampleInjectServiceIntoDecoratorController } from './example-inject-service-into-decorator.controller';
import { ExampleInjectServiceIntoDecoratorService } from './example-inject-service-into-decorator.service';

describe('ExampleInjectServiceIntoDecoratorController', () => {
  let exampleInjectServiceIntoDecoratorController: ExampleInjectServiceIntoDecoratorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExampleInjectServiceIntoDecoratorController],
      providers: [ExampleInjectServiceIntoDecoratorService],
    }).compile();

    exampleInjectServiceIntoDecoratorController = app.get<ExampleInjectServiceIntoDecoratorController>(ExampleInjectServiceIntoDecoratorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(exampleInjectServiceIntoDecoratorController.getHello()).toBe('Hello World!');
    });
  });
});
