import { Provider } from "@nestjs/common"
import { ClientOptions } from "nacos"

import { NACOS_CONFIG_TOKEN } from "./nacos.config.constants"

export function createNacosConfigProvider(useValue: ClientOptions): Provider<ClientOptions> {
    return {
        provide: NACOS_CONFIG_TOKEN,
        useValue: useValue
    };
}