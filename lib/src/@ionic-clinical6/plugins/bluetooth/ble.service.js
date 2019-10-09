var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BLE } from '@ionic-native/ble';
import { BluetoothFactory } from './bluetooth.factory';
import { bluetoothServices, bluetoothCharacteristics } from './bluetooth.utility';
let BLEService = class BLEService extends BLE {
    constructor(ble) {
        super();
        this.ble = ble;
    }
    scan(services, seconds) {
        return Observable.create((observer) => {
            for (var i = 0; i < services.length; ++i) {
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
    startScan(services) {
        return Observable.create((observer) => {
            this.ble.startScan(services).subscribe(device => {
                observer.next(BluetoothFactory.create(device, this));
            });
        });
    }
    startScanWithOptions(services, options) {
        return Observable.create((observer) => {
            this.ble.startScanWithOptions(services, options).subscribe(device => {
                observer.next(BluetoothFactory.create(device, this));
            });
        });
    }
    connect(deviceId) {
        return Observable.create((observer) => {
            this.ble.connect(deviceId).subscribe(device => {
                observer.next(BluetoothFactory.create(device, this));
            });
        });
    }
    read(deviceId, service, characteristic) {
        let _service = service;
        let _characteristic = characteristic;
        if (bluetoothServices[service]) {
            _service = bluetoothServices[service].toString(16);
        }
        if (bluetoothCharacteristics[characteristic]) {
            _characteristic = bluetoothCharacteristics[characteristic].toString(16);
        }
        return this.ble.read(deviceId, _service, _characteristic);
    }
    write(deviceId, service, characteristic, value) {
        let _service = service;
        let _characteristic = characteristic;
        if (bluetoothServices[service]) {
            _service = bluetoothServices[service].toString(16);
        }
        if (bluetoothCharacteristics[characteristic]) {
            _characteristic = bluetoothCharacteristics[characteristic].toString(16);
        }
        return this.ble.write(deviceId, _service, _characteristic, value);
    }
    writeWithoutResponse(deviceId, service, characteristic, value) {
        let _service = service;
        let _characteristic = characteristic;
        if (bluetoothServices[service]) {
            _service = bluetoothServices[service].toString(16);
        }
        if (bluetoothCharacteristics[characteristic]) {
            _characteristic = bluetoothCharacteristics[characteristic].toString(16);
        }
        return this.ble.writeWithoutResponse(deviceId, _service, _characteristic, value);
    }
    startNotification(deviceId, service, characteristic) {
        let _service = service;
        let _characteristic = characteristic;
        if (bluetoothServices[service]) {
            _service = bluetoothServices[service].toString(16);
        }
        if (bluetoothCharacteristics[characteristic]) {
            _characteristic = bluetoothCharacteristics[characteristic].toString(16);
        }
        return this.ble.startNotification(deviceId, _service, _characteristic);
    }
    stopNotification(deviceId, service, characteristic) {
        let _service = service;
        let _characteristic = characteristic;
        if (bluetoothServices[service]) {
            _service = bluetoothServices[service].toString(16);
        }
        if (bluetoothCharacteristics[characteristic]) {
            _characteristic = bluetoothCharacteristics[characteristic].toString(16);
        }
        return this.ble.stopNotification(deviceId, _service, _characteristic);
    }
};
BLEService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [BLE])
], BLEService);
export { BLEService };

//# sourceMappingURL=ble.service.js.map
