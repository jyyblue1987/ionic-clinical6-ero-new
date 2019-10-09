import { Component, Input, Output, EventEmitter, Optional } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { AppConfig } from '../config';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'app-toolbar.html',
})

export class AppToolbar {
  currentPlatform: string;
  static defaultBackLabel: string;
  @Input()  layout;                           // MANDATORY - Defines the overall toolbar layout (see comments at the bottom)
  @Input()  bgColor;                          // Background color
  @Input()  title;                            // Title of the page (in case of image logo, please use the appropriate layout)

  @Input()  backLabel;                        // Label (if any) of the 'Back' button on the top left
  @Output() backClick = new EventEmitter();   // Action associated to the 'Back' button click

  @Input()  leftBtnLabel;                        // Label (if any) of the button on the top left
  @Output() leftBtnClick = new EventEmitter();   // Action associated to the 'left' button click

  @Input()  actionHidden = false;             // Hide or show action buttons on right
  @Input()  actionDisabled = false;           // If true sets the top right button as disabled
  @Input()  rightLabel;                       // Label of the action button on the top right
  @Input()  infoIconClass;                    // Class to be used for the Info icon ()
  @Input()  alertsIconClass;                  // Class to be used for the Alerts icon (Points, etc...)
  @Input()  alert;                            // Label to be displayed when a alerts/rewards widget is part of the choosen layout
  @Output() actionClick = new EventEmitter(); // Action associated to the top right button

  constructor(
    public platform: Platform,
    @Optional() private navCtrl: NavController
  ) {
    this.currentPlatform = this.platform.is('android') ? 'Android' : 'iOS';
    this.layout = this.layout || 'plain';
    this.infoIconClass = this.infoIconClass || 'app-p6-icon-info';
    this.alertsIconClass = this.alertsIconClass || 'app-p6-icon-cup';
    this.backLabel = this.backLabel || AppToolbar.defaultBackLabel;
  }

  ngOnChanges() { }

  
  backButtonClick(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    this.navCtrl && this.navCtrl.pop(AppConfig.animationOptBack);
    this.backClick.emit();
  }

  leftButtonClick(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    this.leftBtnClick.emit();
  }

  onRightActionClick() {
    this.actionClick.emit();
  }

  displayTextTitle() {
    return ['plain', 'plain-info', 'plain-action', 'plain-plus'].indexOf(this.layout) > -1 || (this.title && this.title !== '');
  }

  displayLogoTitle() {
    return ['app', 'app-menu', 'app-alerts', 'app-only', 'app-back'].indexOf(this.layout) > -1;
  }

  displayLeftButton() {
    return (this.leftBtnLabel && ['app-menu', 'app-only'].indexOf(this.layout) === -1);
  }

  displayBackButton() {
    return (this.backLabel && ['app-menu', 'app-only'].indexOf(this.layout) === -1);
  }

  displayAlerts() {
    return ['app-back', 'app-menu'].indexOf(this.layout) > -1;
  }

  displayAction() {
    return !this.actionHidden && (this.displayTextTitle() || this.displayAlerts());
  }
}

/*
Supported Toolbar layouts

<!-- Layout E2/X1: Center Text Title + Back Arrow  + Back Label + Info right icon -->
  <app-toolbar [title]="'Step 1: Site Information'" [backLabel]="'Study'"  [bgColor]="themeColor"
              layout="plain-info"
              (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>

<!-- Layout Q4 -->
  <app-toolbar [title]="'About Study'" [backLabel]="buttonText"  [bgColor]="themeColor"
              layout="plain"
             ></app-toolbar>


<!-- Layout E11.1/T6/K1/T18.2 -->
  <app-toolbar [title]="'Secure Storage Area'" [backLabel]="buttonText"  [bgColor]="themeColor"
              layout="plain-action" [rightLabel]="'Edit'"
              (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>

<!-- Layout V6 -->
  <app-toolbar [title]="'Investigator Brochure'" 
              layout="plain"
             ></app-toolbar>

<!-- Layout U10/E11/T14 -->
  <app-toolbar [title]="'Site Addresses'" [backLabel]="'Home'"  [bgColor]="themeColor"
              layout="plain-plus"
              (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>


<!-- Layout A2: Company Logo centered + back arrow + back Label -->
To change app logo on the toolbar, please create a .scss mapping between 
.app-p6-icon-logo:before and the new icon. 
eg. by putting:
        app-toolbar .app-logo:before {
            font-family: 'new-app-icons' !important;
            font-size: 3.6rem;
            line-height: 1.1;
            @extend .new-app-icon-logo:before
        }
inside app.scss
//
    <app-toolbar [backLabel]="'Back'"  [bgColor]="'aqua'"
                layout="app"
               ></app-toolbar>

<!-- Layout A8: Company Logo centered only -->
    <app-toolbar [bgColor]="'green'"
                layout="app-only"></app-toolbar>

<!-- Layout W2 -->
    <app-toolbar [backLabel]="'Home'"  [bgColor]="'orange'" [alert]="'1000'" alertsIconClass="icon-alert"
                layout="app-back"
                (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>

<!-- Layout E1 (eg. Dashboard)-->
    <app-toolbar [bgColor]="'blue'" [alert]="'1000'" alertsIconClass="alert-icon"
                layout="app-menu" 
                (actionClick)="showAlert('Info', 'sample message')"></app-toolbar>


*/
