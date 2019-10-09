import { BluetoothDevice } from './bluetooth-device.model';
import { Observable } from 'rxjs/Observable';
import { BLEService } from '../ble.service';
export declare class ForaGlucometer extends BluetoothDevice {
    ble: BLEService;
    dateTime: Date;
    glucoseLevel: number;
    dateTimeRaw: any;
    glucoseLevelRaw: any;
    valueTypeRaw: any;
    getGlucoseLevel(): Observable<any>;
    constructor(response: any, ble: BLEService);
}
