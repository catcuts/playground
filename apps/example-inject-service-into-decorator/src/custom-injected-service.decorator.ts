import { Module, Inject } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';

import { RouterModule } from '@nestjs/core';
import { ROUTES } from '@nestjs/core/router/router-module';

import { ConfigModule, ConfigService } from '@nestjs/config';

// ✔️自定义一个装饰器，支持从配置中读取 APP_URL 作为 AppController 的路由路径
export function CustomInjectedServiceModuleDecorator(metadata: ModuleMetadata/*继承 Module 装饰器的参数*/): ClassDecorator {
    return (constructor: any) => {
        // 返回目标类
        Module({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: ['.env.example-inject-service-into-decorator'],  // ⭐这里指定 env 文件路径，以便验证是否注入的是这个 ConfigService 实例
                    //   isGlobal: true,  // ⭐无需（也不应设置为全局，否则会影响其他模块的 ConfigService 实例（因为 ConfigService 是单例模式）
                }),
                {
                    imports: [ConfigModule/*⭐必需*/],
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
                                        module: constructor,
                                    },
                                ];
                            },
                            inject: [ConfigService],
                        },
                    ],
                },
                ...metadata.imports,
            ],
            //   exports: [ConfigService],  // ⭐无需
            controllers: metadata.controllers,
            providers: metadata.providers,
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
