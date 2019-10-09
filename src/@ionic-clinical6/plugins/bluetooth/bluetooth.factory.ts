import { ForaGlucometer } from './devices/fora-glucometer.model';
import { BluetoothDevice } from './devices/bluetooth-device.model';
import { BLEService } from './ble.service';

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
  static create(response: any, ble: BLEService) {
    let device;
    if (response) {
      device = new (BluetoothFactory.getClass(response.name))(response, ble);
    }
    return device;
  }
}
