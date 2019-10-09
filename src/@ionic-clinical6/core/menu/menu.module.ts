import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MenuService } from './menu.service';
import { SlidingMenu } from './sliding-menu';
import { SlidingMenuSubCategoryPage } from './submenu';
import { AppToolbarModule } from '../toolbar/app-toolbar.module';

@NgModule({
  declarations: [
    SlidingMenu,
    SlidingMenuSubCategoryPage
  ],
  imports: [
    IonicModule,
    AppToolbarModule
  ],
  exports: [
    SlidingMenu,
    SlidingMenuSubCategoryPage
  ],
  entryComponents: [
    SlidingMenu,
    SlidingMenuSubCategoryPage
  ],
  providers: [ 
    MenuService
  ]
})
export class MenuModule {}