import { Module } from '@nestjs/common';
import { ExampleInjectServiceIntoDecoratorController } from './example-inject-service-into-decorator.controller';
import { ExampleInjectServiceIntoDecoratorService } from './example-inject-service-into-decorator.service';
import { CustomInjectedServiceModuleDecorator } from './custom-injected-service.decorator';

// @Module({
//   imports: [],
//   controllers: [ExampleInjectServiceIntoDecoratorController],
//   providers: [ExampleInjectServiceIntoDecoratorService],
// })
@CustomInjectedServiceModuleDecorator({
    imports: [],
    controllers: [ExampleInjectServiceIntoDecoratorController],
    providers: [ExampleInjectServiceIntoDecoratorService],
})  // 使用这个注入了 service 实例的装饰器，代替上面的 @Module 装饰器，同时传入相同的参数，实现了使用者无感注入
export class ExampleInjectServiceIntoDecoratorModule {}
