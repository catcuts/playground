import { Module, Inject } from '@nestjs/common';

import { RouterModule } from '@nestjs/core';
import { ROUTES } from '@nestjs/core/router/router-module';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { ExampleInjectServiceIntoDecoratorController } from './example-inject-service-into-decorator.controller';
import { ExampleInjectServiceIntoDecoratorService } from './example-inject-service-into-decorator.service';
import { ExampleInjectServiceIntoDecoratorModule } from './example-inject-service-into-decorator.module';

// ✔️自定义一个装饰器，支持从配置中读取 APP_URL 作为 AppController 的路由路径
export function CustomInjectedServiceModuleDecorator(): ClassDecorator {
    return (constructor: any) => {
        // 返回目标类
        Module({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: ['.env', '.env.local'],  // ⭐这里指定 env 文件路径，以便验证是否注入的是这个 ConfigService 实例
                    //   isGlobal: true,  // ⭐无需
                }),
                {
                    imports: [ConfigModule/*必需*/],
                    module: RouterModule,
                    providers: [
                        // ConfigService,  // ⭐无需
                        {
                            provide: ROUTES,
                            useFactory: (configService: ConfigService) => {
                                console.log(configService);  // ⭐打印出 ConfigService 实例，验证 envFilePath 配置为 ['.env', '.env.local'] 即为注入成功
                                return [
                                    {
                                        path: configService.get('APP_URL'),
                                        module: ExampleInjectServiceIntoDecoratorModule,
                                    },
                                ];
                            },
                            inject: [ConfigService],
                        },
                    ],
                },
            ],
            //   exports: [ConfigService],  // ⭐无需
            controllers: [ExampleInjectServiceIntoDecoratorController],
            providers: [ExampleInjectServiceIntoDecoratorService],
        })(constructor);
    };
}

// 【⚠️已验证不可行】自定义一个装饰器，支持从配置中读取 APP_URL 作为 AppController 的路由路径
// export function CustomInjectedServiceModuleDecorator(): ClassDecorator {
//     ConfigModule.forRoot({
//         envFilePath: ['.env', '.env.local'],
//     });
//     const configServiceInjector = Inject(ConfigService);
//     return (constructor: any) => {
//         console.log('constructor:', constructor);
//         console.log('configService:', this.configService);
//         // 为目标类添加一个静态属性，用于保存模块的元数据
//         // // 注入 ConfigService
//         configServiceInjector(constructor, 'configService');
//         const configService: ConfigService = constructor.configService;
//         console.log('configService:', configService);  // ⚠️undefined
//         // 返回目标类
//         Module({
//             imports: [
//                 {
//                     imports: [ConfigModule],
//                     module: RouterModule,
//                     providers: [
//                         {
//                             provide: ROUTES,
//                             useFactory: (configService: ConfigService) => {
//                                 console.log(configService);
//                                 return [
//                                     {
//                                         path: configService.get('APP_URL'),  // ⚠️报错：TypeError: Cannot read properties of undefined (reading 'configService')
//                                         module: ExampleInjectServiceIntoDecoratorModule,
//                                     },
//                                 ];
//                             },
//                             inject: [ConfigService],
//                         },
//                     ],
//                 },
//             ],
//             controllers: [ExampleInjectServiceIntoDecoratorController],
//             providers: [ExampleInjectServiceIntoDecoratorService],
//         })(constructor);
//     };
// }

// ✔️自定义一个装饰器，功能和下面注释掉的 CustomInjectedServiceDecorator 装饰器一致
// export function CustomInjectedServiceDecorator() {
//     return function (target: any) {
//         // 为目标类添加一个静态属性，用于保存模块的元数据
//         target.__isCustomInjectedServiceDecorator = true;
//         // 返回目标类
//         Module({
//             imports: [],
//             controllers: [AppController],
//             providers: [AppService],
//         })(target);
//     };
// }

// ✔️自定义一个装饰器，功能和 Module 装饰器一致
// export function CustomInjectedServiceDecorator() {
//   return Module({
//     imports: [],
//     controllers: [AppController],
//     providers: [AppService],
//   });
// }
