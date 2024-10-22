import { Type } from '@nestjs/common';

export interface DiscoveredModule<T = object> {
    name: string;
    instance: T;
    injectType?: Function | Type<any>;
    dependencyType: Type<T>;
}

export interface DiscoveredClass extends DiscoveredModule {
    parentModule: DiscoveredModule;
}

export interface DiscoveredMethod {
    handler: (...args: any[]) => any;
    methodName: string;
    parentClass: DiscoveredClass;
}

export interface DiscoveredProperty {
    propertyName: string;
    parentModule: DiscoveredModule;
}

export interface DiscoveredMethodWithMeta<T> {
    discoveredMethod: DiscoveredMethod;
    meta: T;
}

export interface DiscoveredPropertyWithMeta<T> {
    discoveredProperty: DiscoveredProperty;
    meta: T;
}

export interface DiscoveredClassWithMeta<T> {
    discoveredClass: DiscoveredClass;
    meta: T;
}

export type MetaKey = string | number | symbol;

export type Filter<T> = (item: T) => boolean;