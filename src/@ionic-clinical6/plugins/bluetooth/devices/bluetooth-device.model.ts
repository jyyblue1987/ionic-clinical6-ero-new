import { bluetoothCharacteristics, bluetoothServices, getKeyFromValue } from '../bluetooth.utility';
import { BluetoothCharacteristic } from '../bluetooth-characteristic.model';
import { BLEService } from '../ble.service';

export class BluetoothDevice {
  id: string;
  advertising: any;
  rssi: number;
  name?: string;
  services?: Array<string>;
  characteristics?: Array<BluetoothCharacteristic>;

  get serviceNames() {
    return this.services.map(s => getKeyFromValue(parseInt(s, 16), bluetoothServices));
  }

  constructor(response: any, public ble: BLEService) {
    if (response) {
      Object.assign(this, response);
      if (this.characteristics && this.characteristics.length > 0) {
        this.characteristics = this.characteristics.map( c => new BluetoothCharacteristic(c));
      }
    }
  }
}
