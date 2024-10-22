import "nacos"

declare module 'nacos' {
    interface NacosNamingClient {
        close(): void;
    }
    interface NacosConfigClient {
        ready(): Promise<void>
    }
    interface Instance {
        instanceId?: string;
        healthy?: boolean;
        enabled?: boolean;
        groupName?: string;
    }
}