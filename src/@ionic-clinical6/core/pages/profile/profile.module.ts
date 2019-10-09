import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { UserProfilePage } from './user-profile/user-profile';
import { CompanionsDashboardPage } from './companions/companions-dashboard';
import { ProfileService } from './profile.service';
import { PATIENT_PROFILE_FORM, COMPANION_PROFILE_FORM } from './profile.mock';
// import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
import { InputsModule } from '../../flow_process/flow_inputs/inputs.module'
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    UserProfilePage,
    CompanionsDashboardPage
  ],
  imports: [IonicModule, AppToolbarModule, InputsModule],
  entryComponents: [
    UserProfilePage,
    CompanionsDashboardPage 
  ],
  exports: [
    UserProfilePage,
    CompanionsDashboardPage
  ],
  providers: [ Camera, Transfer, TransferObject, ProfileService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProfileModule {}