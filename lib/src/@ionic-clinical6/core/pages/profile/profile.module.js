var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserProfilePage } from './user-profile/user-profile';
import { CompanionsDashboardPage } from './companions/companions-dashboard';
import { ProfileService } from './profile.service';
// import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
import { InputsModule } from '../../flow_process/flow_inputs/inputs.module';
import { AppToolbarModule } from '../../toolbar/app-toolbar.module';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    NgModule({
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
        providers: [Camera, Transfer, TransferObject, ProfileService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], ProfileModule);
export { ProfileModule };

//# sourceMappingURL=profile.module.js.map
