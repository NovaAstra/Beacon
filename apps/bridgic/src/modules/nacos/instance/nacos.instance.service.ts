import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common"

import { NacosNamingService } from "../naming";


@Injectable()
export class NacosInstanceService implements OnApplicationBootstrap, OnApplicationShutdown {
    public constructor(private readonly namingService: NacosNamingService) { }

    async onApplicationBootstrap() {
    }

    async onApplicationShutdown() {
    }
}