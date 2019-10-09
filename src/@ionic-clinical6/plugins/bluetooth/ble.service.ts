import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BLE } from '@ionic-native/ble';
import { BluetoothDevice } from './devices/bluetooth-device.model';
import { BluetoothFactory } from './bluetooth.factory';
import { bluetoothServices, bluetoothCharacteristics } from './bluetooth.utility';

@Injectable()
export class BLEService extends BLE {
  constructor(private ble: BLE) {
    super();
  }

  scan(services: string[], seconds: number): Observable<BluetoothDevice> {
    return Observable.create((observer) => {
      for (var i = 0; i < services.length; ++i ) {
        const service = services[i];
        if (bluetoothServices[service]) {
          services[i] = bluetoothServices[service].toString(16);
        }
      }
      this.ble.scan(services, seconds).subscribe(device => {
        observer.next(BluetoothFactory.create(device, this));
      });
    });
  }

  startScan(services: string[]): Observable<BluetoothDevice> {
    return Observable.create((observer) => {
      this.ble.startScan(services).subscribe(device => {
        observer.next(BluetoothFactory.create(device, this));
      });
    });
  }

  startScanWithOptions(services: string[], options: {
        reportDuplicates?: boolean;
    } | any): Observable<BluetoothDevice> {
    return Observable.create((observer) => {
      this.ble.startScanWithOptions(services, options).subscribe(device => {
        observer.next(BluetoothFactory.create(device, this));
      });
    });
  }

  connect(deviceId: string): Observable<BluetoothDevice> {
    return Observable.create((observer) => {
      this.ble.connect(deviceId).subscribe(device => {
        observer.next(BluetoothFactory.create(device, this));
      });
    });
  }

  read(deviceId: string, service: string, characteristic: string): Promise<any> {
    let _service: string = service;
    let _characteristic: string = characteristic;

    if (bluetoothServices[service]) {
      _service = bluetoothServices[service].toString(16);
    }
    if (bluetoothCharacteristics[characteristic]) {
      _characteristic = bluetoothCharacteristics[characteristic].toString(16);
    }
    return this.ble.read( deviceId, _service, _characteristic);
  }

  write(deviceId: string, service: string, characteristic: string, value: ArrayBuffer): Promise<any> {
    let _service: string = service;
    let _characteristic: string = characteristic;

    if (bluetoothServices[service]) {
      _service = bluetoothServices[service].toString(16);
    }
    if (bluetoothCharacteristics[characteristic]) {
      _characteristic = bluetoothCharacteristics[characteristic].toString(16);
    }
    return this.ble.write( deviceId, _service, _characteristic, value);
  }

  writeWithoutResponse(deviceId: string, service: string, characteristic: string, value: ArrayBuffer): Promise<any> {
    let _service: string = service;
    let _characteristic: string = characteristic;

    if (bluetoothServices[service]) {
      _service = bluetoothServices[service].toString(16);
    }
    if (bluetoothCharacteristics[characteristic]) {
      _characteristic = bluetoothCharacteristics[characteristic].toString(16);
    }
    return this.ble.writeWithoutResponse( deviceId, _service, _characteristic, value);
  }

  startNotification(deviceId: string, service: string, characteristic: string): Observable<any> {
    let _service: string = service;
    let _characteristic: string = characteristic;

    if (bluetoothServices[service]) {
      _service = bluetoothServices[service].toString(16);
    }
    if (bluetoothCharacteristics[characteristic]) {
      _characteristic = bluetoothCharacteristics[characteristic].toString(16);
    }
    return this.ble.startNotification( deviceId, _service, _characteristic);
  }

  stopNotification(deviceId: string, service: string, characteristic: string): Promise<any> {
    let _service: string = service;
    let _characteristic: string = characteristic;

    if (bluetoothServices[service]) {
      _service = bluetoothServices[service].toString(16);
    }
    if (bluetoothCharacteristics[characteristic]) {
      _characteristic = bluetoothCharacteristics[characteristic].toString(16);
    }
    return this.ble.stopNotification( deviceId, _service, _characteristic);
  }
}
