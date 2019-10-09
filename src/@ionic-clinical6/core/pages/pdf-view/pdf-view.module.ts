import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PdfViewPage } from './pdf-view';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';

@NgModule({
  declarations: [
    PdfViewPage,
    PdfViewerComponent
  ],
  imports: [
    IonicModule, AppToolbarModule
  ],
  entryComponents: [ PdfViewPage ],
  exports: [
    PdfViewPage,
    PdfViewerComponent
  ],
  providers: [ ]
})
export class PdfViewModule {}