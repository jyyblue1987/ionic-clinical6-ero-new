var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { StepInputTextComponent } from '../../../flow_process/flow_inputs/text/stepinput-text.component';
// import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { NavParams } from 'ionic-angular';
let CustomStepInputLoginComponent = class CustomStepInputLoginComponent extends StepInputTextComponent {
    constructor(navParams, platform, elementRef, _keyboard) {
        super();
        this.navParams = navParams;
        this.platform = platform;
        this.elementRef = elementRef;
        this._keyboard = _keyboard;
        this.step = this.navParams.data && this.navParams.data.step ? this.navParams.data.step : null;
    }
    /** Angular lifecycle callback to calculate the displayFormat, the pickerFormat, the minDate and the maxDate to use in the ion-datetime picker */
    ngOnInit() {
        super.ngOnInit();
        this._keyboard.hideKeyboardAccessoryBar(false);
        this.readOnly && (this.focusOut = this.readOnly);
        let attribute = this.flowInput['attribute'];
        if (attribute && attribute['link_button']) {
            this.link_button = this.linkButton;
        }
    }
    btnClicked(ev) {
        this.goToPage.emit({ id: this.flowInput.inputId, value: this.link_button });
    }
    get linkButton() {
        let button;
        if (this.step.paths && this.step.paths.length > 0) {
            button = this.step.paths.filter(btn => (btn.button_name == this.flowInput['attribute']['link_button'] && btn.is_link_button));
        }
        return button && button[0];
    }
};
CustomStepInputLoginComponent = __decorate([
    Component({
        selector: 'custom-stepinput-login',
        template: `
    <div class="login-form {{flowInput.inputId}}">
        <div *ngIf="(body || hint) && !filter['excludeQuestion']" class="form-header {{flowInput.inputId}}">
            <div *ngIf="(body) && !filter['excludeQuestion']" class="body">{{body}}</div>
            <div *ngIf="flowInput['attribute']" [ngClass]="flowInput['attribute']['separator']==='line'?'line-separator':'space-separator'"></div>
            <div *ngIf="(hint) && !filter['excludeQuestion']" class="hint">{{hint}}</div>
        </div> 
            <!--These are the inputs in case of Floating Labels Style -->
        <div class="form-container {{flowInput.inputId}}" [formGroup]="subForm" novalidate *ngIf="!labelStyle || labelStyle !== 'placeholder'">
        
            <ion-item class="input-field" *ngIf="style===InputStyle.text" [class.readonly]="readOnly">
                <!-- <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: ""}}</ion-label>
                <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: ""}}</ion-label> -->
                <ion-input type="text" [placeholder]="title" class="input-{{flowInput.inputId}}" [formControlName]="flowInput.inputId" [readonly]="readOnly" (ionFocus)="focusOut=false"
                (ionBlur)="focusOut=true" autocorrect="off"  autocapitalize="off"></ion-input>
            </ion-item>

            <ion-item class="input-field" *ngIf="style===InputStyle.email" [class.readonly]="readOnly">
                <!-- <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: ""}}</ion-label>
                <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: ""}}</ion-label> -->
                <ion-input type="email" [placeholder]="title"  [formControlName]="flowInput.inputId" [readonly]="readOnly" class="input-{{flowInput.inputId}}" autocapitalize="off"
                    (ionFocus)="focusOut=false" (ionBlur)="focusOut=true" autocorrect="off"  autocapitalize="off">
                </ion-input>
            </ion-item>

            <ion-item class="input-field" *ngIf="style===InputStyle.password" [class.readonly]="readOnly">
                <!-- <ion-label floating *ngIf="!labelStyle || labelStyle === 'floating'">{{title? title: ""}}</ion-label>
                <ion-label stacked *ngIf="labelStyle === 'stacked'">{{title? title: ""}}</ion-label> -->
                <ion-input type="tel" style="-webkit-text-security:disc;" [formControlName]="flowInput.inputId" [readonly]="readOnly" class="input-{{flowInput.inputId}}"
                [minlength]="validationMin" [maxlength]="validationMax" [textMask]="{mask: getPasswordMask(), guide: false}" (ionFocus)="focusOut=false" [placeholder]="title" 
                (ionBlur)="focusOut=true">
                </ion-input>
            </ion-item>
            <!-- <p *ngIf="throwError()" class="error-box">{{throwError()}}</p> -->
            <p *ngIf="getError() && focusOut" class="error-box">{{getError()}}</p>
        </div>
        <!-- <div class="form-footer {{flowInput.inputId}}"> -->
            <!-- Error feedback  -->
            <!-- Error feedback  -->
            <div *ngIf="link_button" class="link-button">
                <a (click)="btnClicked($event)">{{link_button.button_name}}</a>
            </div>
        <!-- </div> -->
    </div> 
  `
    }),
    __metadata("design:paramtypes", [NavParams,
        Platform,
        ElementRef,
        Keyboard])
], CustomStepInputLoginComponent);
export { CustomStepInputLoginComponent };

//# sourceMappingURL=stepinput-login.js.map
