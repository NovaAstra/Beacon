import { Provider } from "@nestjs/common";
import { Instance } from "nacos"

import { NACOS_INSTANCE_CONFIG_TOKEN } from "./nacos.instance.constants"

export function createNacosInstanceProvider(useValue: Instance): Provider<Instance> {
    return {
        provide: NACOS_INSTANCE_CONFIG_TOKEN,
        useValue: useValue
    };
}
