import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { TutorialService } from './tutorial.service';
import { TutorialModalPage } from './tutorial-modal';

@NgModule({
  declarations: [
    TutorialModalPage
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    TutorialModalPage
  ],
  entryComponents: [
    TutorialModalPage
  ],
  providers: [
    TutorialService
  ]
})
export class TutorialModule {}