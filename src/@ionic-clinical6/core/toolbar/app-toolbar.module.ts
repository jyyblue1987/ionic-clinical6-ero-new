import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AppToolbar } from './app-toolbar';

@NgModule({
  declarations: [ AppToolbar ],
  exports: [ AppToolbar ],
  imports: [ IonicModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppToolbarModule { }