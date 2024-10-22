import { Inject, Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common"
import { NacosConfigClient, ClientOptions } from "nacos"

import { DiscoveryService } from '../../discovery';
import { NACOS_CONFIG_TOKEN, NACOS_CONFIG_METADATA } from "./nacos.config.constants"

@Injectable()
export class NacosConfigService implements OnModuleInit, OnModuleDestroy {
    private readonly listeners = new Set<{
        dataId: string;
        group: string;
        listener: Function;
    }>();

    private configClient: NacosConfigClient;


    public constructor(
        private readonly discover: DiscoveryService,
        @Inject(NACOS_CONFIG_TOKEN) private readonly options: ClientOptions
    ) {

    }

    public async onModuleInit() {
        this.configClient = new NacosConfigClient(this.options);
        await this.configClient.ready();

        const nacosMeta = await this.discover.providerPropertyWithMetaAtKey<{ dataId: string; group: string }>(NACOS_CONFIG_METADATA)

        console.log(nacosMeta)
    }

    public async onModuleDestroy() {
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