import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common"
import { Instance } from "nacos"

import { NacosNamingService } from "../naming";
import { NACOS_INSTANCE_CONFIG_TOKEN } from "./nacos.instance.constants"


@Injectable()
export class NacosInstanceService implements OnApplicationBootstrap, OnApplicationShutdown {
    public constructor(
        @Inject(NACOS_INSTANCE_CONFIG_TOKEN)
        private readonly options: Instance,
        private readonly namingService: NacosNamingService
    ) { }

    async onApplicationBootstrap() {
        await this.namingService.registerInstance(this.options.serviceName, this.options, this.options.groupName);
    }

    async onApplicationShutdown() {
        await this.namingService.deregisterInstance(this.options.serviceName, this.options, this.options.groupName);
    }
}