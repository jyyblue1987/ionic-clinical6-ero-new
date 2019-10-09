var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ResourcesPage } from './resources';
import { PlainPage } from '../plain/plain-page';
import { GlossaryPage } from '../glossary/glossary';
import { FAQsPage } from '../faq/faq';
import { AboutPage } from '../about/about';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
let ResourcesModule = class ResourcesModule {
};
ResourcesModule = __decorate([
    NgModule({
        declarations: [
            ResourcesPage, PlainPage, GlossaryPage, FAQsPage, AboutPage
        ],
        imports: [
            IonicModule, AppToolbarModule
        ],
        entryComponents: [ResourcesPage, PlainPage, GlossaryPage, FAQsPage, AboutPage],
        exports: [
            ResourcesPage, PlainPage, GlossaryPage, FAQsPage, AboutPage
        ],
        providers: []
    })
], ResourcesModule);
export { ResourcesModule };

//# sourceMappingURL=resources.module.js.map
