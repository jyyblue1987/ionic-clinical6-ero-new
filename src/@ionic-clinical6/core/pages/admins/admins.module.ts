import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CreateNewUserPage } from './create-new-user';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';


@NgModule({
  declarations: [
    CreateNewUserPage
  ],
  imports: [
    IonicModule, AppToolbarModule
  ],
  entryComponents: [ CreateNewUserPage ],
  exports: [
    CreateNewUserPage
  ],
  providers: [ ]
})
export class AdminsModule {}