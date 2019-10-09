export declare class BluetoothCharacteristic {
    service: string;
    characteristic: string;
    properties: Array<string>;
    descriptors?: Array<any>;
    readonly characteristicName: string;
    readonly serviceName: string;
    constructor(response?: any);
}
