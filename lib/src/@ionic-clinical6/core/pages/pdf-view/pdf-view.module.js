var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PdfViewPage } from './pdf-view';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
let PdfViewModule = class PdfViewModule {
};
PdfViewModule = __decorate([
    NgModule({
        declarations: [
            PdfViewPage,
            PdfViewerComponent
        ],
        imports: [
            IonicModule, AppToolbarModule
        ],
        entryComponents: [PdfViewPage],
        exports: [
            PdfViewPage,
            PdfViewerComponent
        ],
        providers: []
    })
], PdfViewModule);
export { PdfViewModule };

//# sourceMappingURL=pdf-view.module.js.map
