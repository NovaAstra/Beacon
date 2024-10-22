import { Inject, Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common"
import { NacosConfigClient, ClientOptions } from "nacos"

import { NACOS_CONFIG_TOKEN } from "./nacos.config.constants"

@Injectable()
export class NacosConfigService implements OnModuleInit, OnModuleDestroy {
    private readonly listeners = new Set<{
        dataId: string;
        group: string;
        listener: Function;
    }>();

    private configClient: NacosConfigClient;


    public constructor(
        @Inject(NACOS_CONFIG_TOKEN) private readonly options: ClientOptions
    ) { }

    async onModuleInit() {
        this.configClient = new NacosConfigClient(this.options);
        await this.configClient.ready();
    }

    async onModuleDestroy() {
        for (const { dataId, group, listener } of this.listeners) {
            this.configClient.unSubscribe({ dataId, group }, listener);
        }

        this.listeners.clear()

        if (this.configClient) {
            this.configClient.close()
            this.configClient = null
        }
    }
}