import { bluetoothCharacteristics, bluetoothServices, getKeyFromValue } from './bluetooth.utility';

export class BluetoothCharacteristic {
  service: string;
  characteristic: string;
  properties: Array<string>;
  descriptors?: Array<any>;

  get characteristicName() {
    return getKeyFromValue(parseInt(this.characteristic, 16), bluetoothCharacteristics);
  }

  get serviceName() {
    return getKeyFromValue(parseInt(this.service, 16), bluetoothServices);
  }

  constructor(response?: any) {
    if (response) {
      Object.assign(this, response);
    }
  }
}

