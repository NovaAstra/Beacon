import { Global, Module, DynamicModule } from "@nestjs/common"
import { NacosNamingClientConfig } from "nacos"

import { createNacosNamingProvider } from "./nacos.naming.provider"
import { NacosNamingService } from "./nacos.naming.service"


@Global()
@Module({})
export class NacosNamingModule {
    public static forRoot(config: NacosNamingClientConfig): DynamicModule {
        const provider = createNacosNamingProvider(config);
        return {
            module: NacosNamingModule,
            providers: [provider, NacosNamingService],
            exports: [NacosNamingService]
        };
    }
}