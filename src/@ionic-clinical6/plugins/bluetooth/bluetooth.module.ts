import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BLEService } from './ble.service';
import { BluetoothService } from './bluetooth.service';
import { BLE } from '@ionic-native/ble';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BluetoothCharacteristic } from './bluetooth-characteristic.model';
import { BluetoothDevice } from './devices/bluetooth-device.model';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  entryComponents: [],
  providers: [
    BLE,
    BluetoothSerial,
    BLEService,
    BluetoothService,
  ]
})
export class BluetoothModule {}