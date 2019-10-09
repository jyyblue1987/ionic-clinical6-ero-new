import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ResourcesPage } from './resources';
import { PlainPage } from '../plain/plain-page';
import { GlossaryPage } from '../glossary/glossary';
import { FAQsPage } from '../faq/faq';
import { AboutPage } from '../about/about';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';


@NgModule({
  declarations: [
    ResourcesPage, PlainPage, GlossaryPage, FAQsPage, AboutPage
  ],
  imports: [
    IonicModule, AppToolbarModule
  ],
  entryComponents: [ ResourcesPage, PlainPage, GlossaryPage, FAQsPage, AboutPage ],
  exports: [
    ResourcesPage, PlainPage, GlossaryPage, FAQsPage, AboutPage
  ],
  providers: [ ]
})
export class ResourcesModule {}