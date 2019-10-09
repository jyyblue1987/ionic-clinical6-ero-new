var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HelpModalPage } from './help-modal';
import { AlertModalPage } from './alert-modal';
import { AppToolbarModule } from '../toolbar/app-toolbar.module';
let ModalModule = class ModalModule {
};
ModalModule = __decorate([
    NgModule({
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
        providers: []
    })
], ModalModule);
export { ModalModule };

//# sourceMappingURL=modal.module.js.map
