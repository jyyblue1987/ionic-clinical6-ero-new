var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import moment from 'moment';
let MomentDatePipe = class MomentDatePipe {
    transform(value, arg) {
        if (arg === 'calendar')
            return moment(value).calendar();
        else
            return moment(value).format(arg);
    }
};
MomentDatePipe = __decorate([
    Pipe({
        name: 'momentdate'
    })
], MomentDatePipe);
export { MomentDatePipe };

//# sourceMappingURL=momentdate.pipe.js.map
