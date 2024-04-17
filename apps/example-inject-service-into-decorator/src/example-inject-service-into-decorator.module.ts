import { Module } from '@nestjs/common';
import { ExampleInjectServiceIntoDecoratorController } from './example-inject-service-into-decorator.controller';
import { ExampleInjectServiceIntoDecoratorService } from './example-inject-service-into-decorator.service';
import { CustomInjectedServiceModuleDecorator } from './custom-injected-service.decorator';

// @Module({
//   imports: [],
//   controllers: [ExampleInjectServiceIntoDecoratorController],
//   providers: [ExampleInjectServiceIntoDecoratorService],
// })
@CustomInjectedServiceModuleDecorator()  // 使用这个注入了 service 实例的装饰器
export class ExampleInjectServiceIntoDecoratorModule {}
