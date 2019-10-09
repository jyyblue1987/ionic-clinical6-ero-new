import { bluetoothCharacteristics, bluetoothServices, getKeyFromValue } from './bluetooth.utility';
export class BluetoothCharacteristic {
    get characteristicName() {
        return getKeyFromValue(parseInt(this.characteristic, 16), bluetoothCharacteristics);
    }
    get serviceName() {
        return getKeyFromValue(parseInt(this.service, 16), bluetoothServices);
    }
    constructor(response) {
        if (response) {
            Object.assign(this, response);
        }
    }
}

//# sourceMappingURL=bluetooth-characteristic.model.js.map
