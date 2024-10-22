import { Module, DynamicModule, Global } from "@nestjs/common";
import { Instance } from "nacos"

import { NacosInstanceService } from "./nacos.instance.service"
import { createNacosInstanceProvider } from "./nacos.instance.provider"

@Global()
@Module({})
export class NacosInstanceModule {
    public static forRoot(options: Instance): DynamicModule {
        const provider = createNacosInstanceProvider(options);
        return {
            module: NacosInstanceModule,
            providers: [provider, NacosInstanceService],
            exports: [NacosInstanceService]
        };
    }
}