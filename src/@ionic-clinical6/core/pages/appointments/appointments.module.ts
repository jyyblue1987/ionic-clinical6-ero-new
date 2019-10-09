import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AppToolbarModule } from '../../toolbar/app-toolbar.module';

import { AppointmentsService } from './appointments.service';
import { AppointmentsPage } from './appointments';

import { EditAppointmentPage } from './edit/edit-appointment';

@NgModule({
  declarations: [
    AppointmentsPage,
    EditAppointmentPage
  ],
  imports: [
    IonicModule,
    AppToolbarModule
  ],
  exports: [
  ],
  entryComponents: [
    AppointmentsPage,
    EditAppointmentPage
  ],
  providers: [
    AppointmentsService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppointmentsModule {}