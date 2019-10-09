
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothDevice } from './devices/bluetooth-device.model';
import { bluetoothServices, bluetoothCharacteristics } from './bluetooth.utility';

@Injectable()
export class BluetoothService extends BluetoothSerial {
  constructor(private bluetoothSerial: BluetoothSerial) {
    super();
  }
}

