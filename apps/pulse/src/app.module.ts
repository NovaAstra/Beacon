import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { NacosNamingModule, NacosConfigModule, NacosInstanceModule } from "./modules/nacos"
import { WidgetModule } from "./modules/widget"

import { AppController } from "./app.controller"


@Module({
  imports: [
    NacosNamingModule.forRoot({
      serverList: "192.168.0.203:8848",
      namespace: 'public',
      logger: console
    }),
    NacosConfigModule.forRoot({
      serverAddr: "192.168.0.203:8848",
      namespace: 'public',
    }),
    NacosInstanceModule.forRoot({
      serviceName: 'node-pdf-bridgic',
      ip: "192.168.1.28",
      port: 3001
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: (() => {
          const logLevel = {
            production: 'info',
            development: 'debug',
            test: 'error',
          };

          return logLevel[process.env.NODE_ENV] || 'info';
        })(),
        transport: {
          target: 'pino-socket',
          options: {
            address: '192.168.0.203',
            port: 5601,
            mode: 'tcp',
            reconnect: true,
            recovery: true
          },
        },
        redact: ['req.headers.authorization'],
      },
    }),
    WidgetModule
  ],
  controllers: [AppController]
})
export class AppModule { }
