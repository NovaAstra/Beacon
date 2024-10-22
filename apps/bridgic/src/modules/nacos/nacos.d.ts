import "nacos"

declare module 'nacos' {
    interface NacosNamingClient {
        close(): void;
    }
    interface NacosConfigClient {
        ready(): Promise<void>
    }
}