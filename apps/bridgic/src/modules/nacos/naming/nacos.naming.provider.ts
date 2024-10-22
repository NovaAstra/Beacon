import { Provider } from "@nestjs/common";
import { NacosNamingClientConfig } from "nacos"

import { NACOS_NAMING_CONFIG_TOKEN } from "./nacos.naming.constants"

export function createNacosNamingProvider(useValue: NacosNamingClientConfig): Provider<NacosNamingClientConfig> {
    return {
        provide: NACOS_NAMING_CONFIG_TOKEN,
        useValue: useValue
    }
}