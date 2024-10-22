import { Injectable, Scope, Type } from "@nestjs/common"
import { ModulesContainer, MetadataScanner, } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { STATIC_CONTEXT } from '@nestjs/core/injector/constants';
import { isFunction, isConstructor } from "@nestjs/common/utils/shared.utils";
import { flatMap, get, isNil } from "lodash"

import { MetaKey, Filter, DiscoveredClass, DiscoveredPropertyWithMeta } from "./discovery.interface"

function getMethodNames(prototype: any) {
    const methodNames = Object.getOwnPropertyNames(prototype).filter(prop => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, prop) as PropertyDescriptor;
        if (descriptor.set || descriptor.get) {
            return false;
        }
        return !isConstructor(prop) && isFunction(prototype[prop]);
    });
    return methodNames;
}


@Injectable()
export class DiscoveryService {
    private discoveredProviders?: Promise<DiscoveredClass[]>;

    public constructor(
        private readonly modulesContainer: ModulesContainer,
        private readonly metadataScanner: MetadataScanner,
    ) { }

    public async providerPropertyWithMetaAtKey<T>(
        metaKey: MetaKey,
        providerFilter: Filter<DiscoveredClass> = () => true,
    ) {
        const providers = await this.providers(providerFilter);

        return flatMap(providers, (provider) => this.classPropertyWithMetaAtKey<T>(provider, metaKey));
    }

    private classPropertyWithMetaAtKey<T>(
        component: DiscoveredClass,
        metaKey: MetaKey
    ) {
        const { instance } = component;

        if (!instance) return []

        const prototype = Object.getPrototypeOf(instance);
        

        return Object.getOwnPropertyNames(instance).map((name) =>
            this.extractPropertyMetaAtKey<T>(metaKey, component, name)
        ).filter((x) => !isNil(x.meta));
    }

    private extractPropertyMetaAtKey<T>(
        metaKey: MetaKey,
        discoveredClass: DiscoveredClass,
        propertyName: string,
    ): DiscoveredPropertyWithMeta<T> {
        const { instance } = discoveredClass;

        const meta: T = Reflect.getMetadata(metaKey, instance, propertyName);

        return {
            meta,
            discoveredProperty: {
                propertyName,
                parentModule: discoveredClass,
            },
        };
    }

    private async providers(filter: Filter<DiscoveredClass>): Promise<DiscoveredClass[]> {
        if (!this.discoveredProviders) {
            this.discoveredProviders = this.discover('providers');
        }
        return (await this.discoveredProviders).filter((x) => filter(x));
    }

    private async toDiscoveredClass(
        nestModule: Module,
        wrapper: InstanceWrapper<any>,
    ) {
        const instanceHost = wrapper.getInstanceByContextId(
            STATIC_CONTEXT,
            wrapper && wrapper.id ? wrapper.id : undefined,
        );

        if (instanceHost.isPending && !instanceHost.isResolved) {
            await instanceHost.donePromise;
        }

        return {
            name: wrapper.name as string,
            instance: instanceHost.instance,
            injectType: wrapper.metatype,
            dependencyType: get(instanceHost, 'instance.constructor'),
            parentModule: {
                name: nestModule.metatype.name,
                instance: nestModule.instance,
                injectType: nestModule.metatype,
                dependencyType: nestModule.instance.constructor as Type<object>,
            },
        }
    }

    private async discover(component: 'providers' | 'controllers') {
        const modulesMap = [...this.modulesContainer.entries()];
        return Promise.all(
            flatMap(modulesMap, ([key, nestModule]) => {
                const components = [...nestModule[component].values()];
                return components
                    .filter((component) => component.scope !== Scope.REQUEST)
                    .map((component) => this.toDiscoveredClass(nestModule, component));
            }),
        );
    }
}