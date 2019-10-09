import { Observable } from 'rxjs';
import { BLE } from '@ionic-native/ble';
import { BluetoothDevice } from './devices/bluetooth-device.model';
export declare class BLEService extends BLE {
    private ble;
    constructor(ble: BLE);
    scan(services: string[], seconds: number): Observable<BluetoothDevice>;
    startScan(services: string[]): Observable<BluetoothDevice>;
    startScanWithOptions(services: string[], options: {
        reportDuplicates?: boolean;
    } | any): Observable<BluetoothDevice>;
    connect(deviceId: string): Observable<BluetoothDevice>;
    read(deviceId: string, service: string, characteristic: string): Promise<any>;
    write(deviceId: string, service: string, characteristic: string, value: ArrayBuffer): Promise<any>;
    writeWithoutResponse(deviceId: string, service: string, characteristic: string, value: ArrayBuffer): Promise<any>;
    startNotification(deviceId: string, service: string, characteristic: string): Observable<any>;
    stopNotification(deviceId: string, service: string, characteristic: string): Promise<any>;
}
