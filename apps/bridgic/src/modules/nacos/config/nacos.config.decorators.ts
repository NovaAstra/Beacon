import { applyDecorators, SetMetadata } from "@nestjs/common";

import { NACOS_CONFIG_METADATA, NACOS_CONFIG_CLIENT_METADATA } from "./nacos.config.constants"

export function NacosConfig() {
    return applyDecorators(SetMetadata(NACOS_CONFIG_METADATA, {}))
}

export function NacosConfigClient() {
    return applyDecorators(SetMetadata(NACOS_CONFIG_CLIENT_METADATA, {}))
} 