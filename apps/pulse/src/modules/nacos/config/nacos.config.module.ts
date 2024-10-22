import { Global, Module, DynamicModule } from "@nestjs/common"
import { ClientOptions } from "nacos"

import { DiscoveryModule } from '../../discovery';
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