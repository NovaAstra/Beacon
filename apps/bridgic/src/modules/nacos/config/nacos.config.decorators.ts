import { applyDecorators, SetMetadata } from "@nestjs/common";

import { NACOS_CONFIG_METADATA, NACOS_CONFIG_CLIENT_METADATA } from "./nacos.config.constants"

export function NacosConfig(dataId: string, group: string = "DEFAULT_GROUP") {
    return (target: Object, propertyKey: string | symbol) => {
        Reflect.defineMetadata(NACOS_CONFIG_METADATA, { dataId, group }, target, propertyKey);
    }
}

export function NacosConfigClient() {
    return applyDecorators(SetMetadata(NACOS_CONFIG_CLIENT_METADATA, {}))
} 