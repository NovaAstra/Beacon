import { Injectable } from "@nestjs/common"
import { Logger } from 'nestjs-pino';

import { NacosConfig } from "./modules/nacos"

@Injectable()
export class AppService {
    @NacosConfig("node-pdf-bridgic")
    public testConfig: { len: number } = "undefined" as any;

    constructor(private readonly logger: Logger){
        this.logger.error("asd")
    }
}