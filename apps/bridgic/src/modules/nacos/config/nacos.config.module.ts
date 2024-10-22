import { Global, Module, DynamicModule } from "@nestjs/common"
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { ClientOptions } from "nacos"

import { NacosConfigService } from "./nacos.config.service"
import { createNacosConfigProvider } from "./nacos.config.provider"

@Global()
@Module({
    imports: [DiscoveryModule],
})
export class NacosConfigModule {
    public static forRoot(options: ClientOptions): DynamicModule {
        const provider = createNacosConfigProvider(options);
        return {
            module: NacosConfigModule,
            providers: [provider, NacosConfigService],
            exports: [NacosConfigService]
        };
    }
}