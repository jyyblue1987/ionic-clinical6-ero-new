var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
import { AppointmentsService } from './appointments.service';
import { AppointmentsPage } from './appointments';
import { EditAppointmentPage } from './edit/edit-appointment';
let AppointmentsModule = class AppointmentsModule {
};
AppointmentsModule = __decorate([
    NgModule({
        declarations: [
            AppointmentsPage,
            EditAppointmentPage
        ],
        imports: [
            IonicModule,
            AppToolbarModule
        ],
        exports: [],
        entryComponents: [
            AppointmentsPage,
            EditAppointmentPage
        ],
        providers: [
            AppointmentsService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], AppointmentsModule);
export { AppointmentsModule };

//# sourceMappingURL=appointments.module.js.map
