import { bluetoothServices, getKeyFromValue } from '../bluetooth.utility';
import { BluetoothCharacteristic } from '../bluetooth-characteristic.model';
export class BluetoothDevice {
    constructor(response, ble) {
        this.ble = ble;
        if (response) {
            Object.assign(this, response);
            if (this.characteristics && this.characteristics.length > 0) {
                this.characteristics = this.characteristics.map(c => new BluetoothCharacteristic(c));
            }
        }
    }
    get serviceNames() {
        return this.services.map(s => getKeyFromValue(parseInt(s, 16), bluetoothServices));
    }
}

//# sourceMappingURL=bluetooth-device.model.js.map
