import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HelpModalPage } from './help-modal';
import { AlertModalPage } from './alert-modal';
import { AppToolbarModule } from '../toolbar/app-toolbar.module';

@NgModule({
  declarations: [
    HelpModalPage,
    AlertModalPage
  ],
  imports: [
    IonicModule,
    AppToolbarModule
  ],
  exports: [
    HelpModalPage,
    AlertModalPage
  ],
  entryComponents: [
    HelpModalPage,
    AlertModalPage
  ],
  providers: [ ]
})
export class ModalModule {}