import { Component } from '@angular/core';

import {
  NavController,
  ViewController,
  LoadingController,
  ModalController,
  NavParams,
  MenuController,
  AlertController
} from 'ionic-angular';

import { Clinical6Service } from '../clinical6.service';
import { MenuService } from './menu.service';

import { AppConfig } from '../config';
import { AppMenu, flowService, Flow } from 'clinical6';
import { Flows } from '../flow_process/flow-factory';

@Component({
  selector: 'sliding-submenu',
  templateUrl: 'submenu.html'
})
export class SlidingMenuSubCategoryPage {
  pages: Array<AppMenu>;
  menuItem: AppMenu;
  loadingCtrl: any;
  loadAsDynamicContent: boolean;

  loadingProcess: boolean;
  loadFlowProcessAction: string;

  constructor(public captiveReach: Clinical6Service,
    public nav: NavController,
    public loader: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public menuService: MenuService,
    public menuCtrl?: MenuController,
    public alertCtrl?: AlertController
  ) {

    this.menuItem = this.navParams.get('menu');
    this.pages = this.menuItem['subcategories'];

    this.loadingProcess = false;
    this.loadFlowProcessAction = 'flow_process';

  }
  openPage(menuItem: AppMenu) {
    if (menuItem.action === this.loadFlowProcessAction) {
      this.goToFlow(menuItem);
      return;
    }

    const nextScreen = this.menuService.getComponent(menuItem);
    if (nextScreen) {
      this.nav.push(nextScreen.page, Object.assign({ menu: menuItem }, nextScreen.options), AppConfig.animationOpt);
    }
  }
  /**
   * This is called in case a flow is completed
   * it should be overridden whenever needed
   * @param flow
   */
  flowCompleteCallback(flow: Flow) {

  }

  goToFlow(menuItem: any) {
    this.loadingProcess = true;
    flowService.getFlow(menuItem.action)
      .then(flow => {

        if (flow.first) {
          flow.end = (step) => {
            this.flowCompleteCallback(flow);
          };
          flowService.getInputDataByFlow(flow)
            .then((result) => {
              this.loadingProcess = false;
              this.nav.push(Flows.Factory(flow.first), { step: flow.first });
              this.menuCtrl.close();
            }).catch((result) => {
              this.loadingProcess = false;
              console.error('Flow Data Retrieval Error: ', result);

              // TODO: Ignoring errors here because of a bug on the Mobile Menu API
              // returning flow id instead of permanent_link
              this.nav.push(Flows.Factory(flow.first), { step: flow.first });
              this.menuCtrl.close();
              // this.showError(null, 'Error Connecting to Server. (2)');
            });
        }
        else {
          this.loadingProcess = false;
          this.showError(null, 'Details: received flow is inconsistent.');
        }
      })
      .catch(reason => {
        this.loadingProcess = false;
        this.showError(null, 'Details: ' + reason);
      });
  }
  showError(title: string = 'Error', errorText: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: errorText,
      cssClass: 'email-alert',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }

    // to fix the issue related to the fetch method for old endpoint
    getImage(page: any) {
      return `url(${page.image.url || page.image.image.url})`;
    }
}