declare interface IApplicationUrls {
    controlPanel: string;
    pins: string;
    securityRandomiser:string;
}

declare interface IRSAKey {
    setPublic(m: string, e: string): void;
    encrypt(text: string): string;
}

declare interface IRSAKeyConstructable {
    new (): IRSAKey;
}

declare var RSAKey: IRSAKeyConstructable;

interface ICryptoInitDetails {
    rsaE: string;
    rsaM: string;
}


declare interface IProxyUrlDefinitions {
    Development?: string,
    Test?: string;
    Production?: string;
    Staging?: string;
}

declare interface IEnvironmentSettings {
    proxyUrl: string,
    applicationurls: IApplicationUrls,
    publicKey: ICryptoInitDetails
}

interface IUserLogin {
    username: string;
    password: string;
}
