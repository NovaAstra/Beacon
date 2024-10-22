import { Global, Module, DynamicModule } from "@nestjs/common"
import { ClientOptions } from "nacos"

import { NacosConfigService } from "./nacos.config.service"
import { createNacosConfigProvider } from "./nacos.config.provider"

@Global()
@Module({})
export class NacosConfigModule {
    public static forRoot(options: ClientOptions): DynamicModule {
        const provider = createNacosConfigProvider(options);
        return {
            module: NacosConfigModule,
            imports: [],
            providers: [provider, NacosConfigService],
            exports: [NacosConfigService]
        };
    }
}