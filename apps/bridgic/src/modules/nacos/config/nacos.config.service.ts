import { Inject, Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common"
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { NacosConfigClient, ClientOptions } from "nacos"
import { ModulesContainer } from '@nestjs/core/injector/modules-container';

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
        private readonly modulesContainer: ModulesContainer,
        private readonly discover: DiscoveryService,
        @Inject(NACOS_CONFIG_TOKEN) private readonly options: ClientOptions
    ) {
        console.log(this.modulesContainer.entries(), 12312)
    }

    public async onModuleInit() {
        this.configClient = new NacosConfigClient(this.options);
        await this.configClient.ready();

        const nacosMeta = await this.discover.providersWithMetaAtKey<{ dataId: string; group: string }>(NACOS_CONFIG_METADATA)
    
        for (const { meta } of nacosMeta) {
            this.listeners.add({
                dataId: meta.dataId,
                group: meta.group,
                listener: async (content: string) => {

                }
            });
        }
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