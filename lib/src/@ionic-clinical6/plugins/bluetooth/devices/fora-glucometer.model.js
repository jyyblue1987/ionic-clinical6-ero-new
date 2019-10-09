import { createMask } from '../bluetooth.utility';
import { BluetoothDevice } from './bluetooth-device.model';
import { Observable } from 'rxjs/Observable';
export class ForaGlucometer extends BluetoothDevice {
    constructor(response, ble) {
        super(response, ble);
        this.ble = ble;
    }
    getGlucoseLevel() {
        return Observable.create((observer) => {
            console.log('start transferring data');
            const self = this;
            try {
                // For FORA device only.
                // all FORA devices commands and retreival are [ start, cmd, data_0, data_2, data_3, data_4, end ]
                const service = '00001523-1212-EFDE-1523-785FEABCD123';
                const characteristic = '00001524-1212-EFDE-1523-785FEABCD123';
                // const service = '1523';
                // const characteristic = '1524';
                const start = 0x51;
                const end = 0xa3;
                const _dateTimeCmd = 0x25; // command to get date/time
                const _valueTypeCmd = 0x26; // command to get value (glucose)
                const _dateTime = [start, _dateTimeCmd, 0x00, 0x00, 0x00, 0x00, end]; // data_0 and data_1 are the index for storage
                const _valueType = [start, _valueTypeCmd, 0x00, 0x00, 0x00, 0x00, end];
                const sum = (array) => array.reduce((a, b) => a + b, 0);
                _dateTime.push(sum(_dateTime));
                _valueType.push(sum(_valueType));
                // const checksum1 = [0x51, 0x25, 0x00, 0x00, 0x00, 0x00, 0xa3].reduce((a, b) => a + b, 0).toString(16); //  = 0x11a
                // const checksum2 = [0x51, 0x26, 0x00, 0x00, 0x00, 0x00, 0xa3].reduce((a, b) => a + b, 0).toString(16);
                let data1, data2;
                this.ble.startNotification(this.id, service, characteristic).subscribe(raw => {
                    const data = new Uint8Array(raw);
                    console.log(`data raw`, raw);
                    console.log(`data Uint8Array`, data);
                    console.log(`data stringified`, JSON.stringify(data));
                    console.log(`data fromCharCode`, String.fromCharCode.apply(null, data));
                    // data should be [start, cmd, data_0, data_1, data_2, data_3, end ]
                    if (data[0] === start) {
                        switch (data[1]) {
                            case _dateTimeCmd:
                                this.dateTimeRaw = data;
                                const dateBytes = (((data[3] & 0xff) << 8) | (data[2] & 0xff)); // 16 bit, data_1 | data_0
                                let day = createMask(0, 4) & dateBytes; // 5 bit
                                let month = createMask(0, 3) & (dateBytes >> 5); // 4 bit
                                let year = createMask(0, 6) & (dateBytes >> 9); // 7 bit
                                // const timeBytes = (((data[5] & 0xff) << 8) | (data[4] & 0xff));
                                let hour = data[5]; // 5 bit data_3
                                let minute = data[4]; // 6 bit data_2
                                console.log(`20${year}-${month}-${day} ${hour}:${minute}`);
                                this.dateTime = new Date(`20${year}-${month}-${day} ${hour}:${minute}`);
                                break;
                            case _valueTypeCmd:
                                this.glucoseLevelRaw = data;
                                // data_1, data_0 are glucose
                                self.glucoseLevel = (((data[3] & 0xff) << 8) | (data[2] & 0xff)); // combine bytes
                                console.log('MY GLUCOSE LEVEL', self.glucoseLevel);
                                // data_3, data_2 are type 1 / type 2
                                // _____________data_3_______________ | ___________data_2________________|
                                // | type 1  | type 2 (4 bits) |          code (10 bits)                 |
                                // [ 1 , 0  ] [ 3 , 2 , 1 , 0 ] [ 9 , 8 , 7 , 6 , 5 , 4 , 3 , 2 , 1 , 0 ]
                                // type 1
                                // 0x0: Gen
                                // 0x1: AC (before meal)
                                // 0x2: PC (after meal)
                                // 0x3: QC (quality control)
                                // type 2
                                // 0x0: Gen.
                                // 0x6: Hematocrit.
                                // 0x7: Ketone value
                                // Hematocrit record: Type I + Type II =0x36 Ketone record: Type I + Type II =0x07 or 0x37
                                observer.next(self);
                                break;
                            default: break;
                        }
                    }
                });
                this.ble.write(this.id, service, characteristic, new Uint8Array(_dateTime).buffer).then(data => data1 = data).catch(err => console.log(err))
                    .then(() => this.ble.write(this.id, service, characteristic, new Uint8Array(_valueType).buffer).then(data => data2 = data).catch(err => console.log(err)));
                // example uint array for glucose
                // 81,38,107,0,0,0,165,135
            }
            catch (e) {
                console.log('error', e.message);
            }
        });
    }
}

//# sourceMappingURL=fora-glucometer.model.js.map
