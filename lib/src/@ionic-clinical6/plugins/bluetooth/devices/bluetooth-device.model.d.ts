import { BluetoothCharacteristic } from '../bluetooth-characteristic.model';
import { BLEService } from '../ble.service';
export declare class BluetoothDevice {
    ble: BLEService;
    id: string;
    advertising: any;
    rssi: number;
    name?: string;
    services?: Array<string>;
    characteristics?: Array<BluetoothCharacteristic>;
    readonly serviceNames: string[];
    constructor(response: any, ble: BLEService);
}
