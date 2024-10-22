import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from "@nestjs/common"
import { NacosNamingClient, NacosNamingClientConfig, Instance, Hosts } from "nacos"

import { NACOS_NAMING_CONFIG_TOKEN } from "./nacos.naming.constants"

@Injectable()
export class NacosNamingService implements OnModuleInit, OnModuleDestroy {
    private namingClient: NacosNamingClient;

    public constructor(@Inject(NACOS_NAMING_CONFIG_TOKEN) config: NacosNamingClientConfig) {
        this.namingClient = new NacosNamingClient({
            ...config,
        })
    }

    async onModuleInit() {
        await this.namingClient.ready();
    }

    async onModuleDestroy() {
        if (this.namingClient) {
            this.namingClient.close();
            this.namingClient = null
        }
    }

    registerInstance(serviceName: string, instance: Instance, groupName?: string) {
        return this.namingClient.registerInstance(serviceName, instance, groupName)
    }

    deregisterInstance(serviceName: string, instance: Instance, groupName?: string) {
        return this.namingClient.deregisterInstance(serviceName, instance, groupName)
    }

    getAllInstances(serviceName: string, groupName?: string, clusters?: string, subscribe?: boolean) {
        return this.namingClient.getAllInstances(serviceName, groupName, clusters, subscribe)
    }

    selectInstances(serviceName: string, groupName?: string, clusters?: string, healthy?: boolean, subscribe?: boolean) {
        return this.namingClient.selectInstances(serviceName, groupName, clusters, healthy, subscribe)
    }

    getServerStatus() {
        return this.namingClient.getServerStatus()
    }

    subscribe(info: string | { serviceName: string; groupName?: string; clusters?: string }, listener: (host: Hosts) => void) {
        return this.namingClient.subscribe(info, listener);
    }

    unSubscribe(info: string | { serviceName: string; groupName?: string; clusters?: string }, listener: (host: Hosts) => void) {
        return this.namingClient.unSubscribe(info, listener);
    }
}