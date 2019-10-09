import { ForaGlucometer } from './devices/fora-glucometer.model';
import { BluetoothDevice } from './devices/bluetooth-device.model';
export class BluetoothFactory {
    static getClass(name) {
        let device;
        switch (name) {
            case 'FORA PREMIUM V10':
                device = ForaGlucometer;
                break;
            default:
                device = BluetoothDevice;
                break;
        }
        return device;
    }
    static create(response, ble) {
        let device;
        if (response) {
            device = new (BluetoothFactory.getClass(response.name))(response, ble);
        }
        return device;
    }
}

//# sourceMappingURL=bluetooth.factory.js.map
