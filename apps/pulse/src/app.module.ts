import { Module } from '@nestjs/common';

import { NacosNamingModule, NacosConfigModule, NacosInstanceModule } from "./modules/nacos"
import { AppService } from "./app.service"

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
    })
  ],
  providers: [
    AppService,
  ]
})
export class AppModule { }
