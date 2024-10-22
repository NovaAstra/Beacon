import { Injectable } from "@nestjs/common"

import {NacosConfig } from "./modules/nacos"

@Injectable()
export class AppService {
    @NacosConfig("node-pdf-bridgic")
    public testConfig: { len: number } = undefined as any;
}