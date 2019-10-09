var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import * as moment from 'moment';
import { AppointmentsService } from '../appointments.service';
import { TranslatorService } from '../../../translator/translator.service';
import { AppConfig } from '../../../config';
let EditAppointmentPage = class EditAppointmentPage {
    constructor(event, nav, navParam, keyboard, appConfig, reminders, translatorService) {
        this.event = event;
        this.nav = nav;
        this.navParam = navParam;
        this.keyboard = keyboard;
        this.appConfig = appConfig;
        this.reminders = reminders;
        this.translatorService = translatorService;
        this.moment = moment;
        this.newReminder = { title: null, start: null, time: null, site: null, id: null };
        this.reminder = {};
        this.isUpdating = false;
        this.content = {};
        this.editMode = this.navParam.get('mode') ? this.navParam.get('mode') : false;
        this.reminder = this.navParam.get('data') || {};
        this.monthShortNames = moment.monthsShort();
    }
    ionViewDidLoad() {
        let nowISO = moment().format();
        this.newReminder = {
            title: null,
            start: nowISO,
            // time: nowISO,
            // start: null,
            time: moment().format('HH:mm'),
            site: null,
            id: null
        };
        this.initializeContent();
    }
    /**
     * Change the labels according to the type of the page: Edit page or New appointment page(Edit Mode or Save mode).
     */
    initializeContent() {
        if (this.editMode) {
            this.content['title'] = 'Set reminder Title';
            this.content['subtitle'] = 'Set Reminder Subtitle';
            this.content['button'] = 'SAVE';
        }
        else {
            this.content['title'] = 'Ucoming Text';
            this.content['subtitle'] = null;
            this.content['button'] = 'Edit';
        }
    }
    handleKeys(event) {
        if (event.keyCode === 13)
            this.keyboard.close();
    }
    goBack() {
        // this.appConfig.calendarMode = 'date';
        this.nav.pop();
    }
    /**
     * Save the new appointment.
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isUpdating)
                return;
            this.editMode = true;
            this.initializeContent();
            // let reminder = Object.assign(this.newReminder, {});
            // reminder.time = moment(reminder.time, 'h:mm A').format('HH:mm');
            this.isUpdating = true;
            yield this.reminders.saveAppointment(this.newReminder)
                .catch(reason => {
                alert(reason);
            });
            this.event.publish('selected-date', this.newReminder.start);
            this.goBack();
            this.isUpdating = false;
            // this.reminders.save(this.newReminder)
            // .then(response => {
            //     alert('ok');
            //     this.goBack();
            //     this.isUpdating = false;
            // })
            //     .catch ( reason => {
            //         alert(reason);
            //         this.isUpdating = false;
            //     });
        });
    }
    /**
     * Prepare the edit mode.
     */
    edit() {
        // To adjust when events are provided
        this.newReminder.title = this.reminder['title'];
        this.newReminder.start = moment(this.reminder['start']).format('YYYY-MM-DD'); // .toISOString(); does not work
        this.newReminder.time = moment(this.reminder['time']).format('HH:mm'); // .toISOString(); does not work
        // this.newReminder.start = this.reminder['start'];
        // this.newReminder.time = this.reminder['time'];
        this.newReminder.site = this.reminder['site'];
        this.newReminder.id = this.reminder['id'];
        this.editMode = true;
        this.initializeContent();
    }
    /**
     * Switch between Edit Mode and Save Mode.
     */
    takeAction() {
        if (this.editMode)
            this.save();
        else
            this.edit();
    }
    translate(string_key) {
        let s = this.translatorService.getInnerHTML(string_key);
        return s;
    }
};
EditAppointmentPage = __decorate([
    Component({
        selector: 'edit-appointment-page',
        template: `
      <ion-header>
          <app-toolbar [title]="'Edit Appointment'" [leftBtnLabel]="'Back'" (leftBtnClick)="goBack()"></app-toolbar>
      </ion-header>

      <ion-content>
          <img class="page-image" src=""/>
          <ion-label class="page-title">{{'Set Appointment Info'}}</ion-label>
          <ion-label class="page-subtitle">{{'Set your appointment information below:'}}</ion-label>
          <div class="page-inputs" *ngIf="editMode">
              <ion-item>
                  <ion-label floating>{{'Name'}}</ion-label>
                  <ion-input type="text" [(ngModel)]="newReminder.title" autocapitalize="off" 
                  (keyup)="handleKeys($event)"></ion-input>
              </ion-item>
              <ion-item>
                  <ion-label floating>{{'Date'}}</ion-label>
                  <ion-datetime id="date-selector" displayFormat="DD/MMM/YYYY" pickerFormat="DD-MMM-YYYY" 
                  [(ngModel)]="newReminder.start" monthShortNames={{monthShortNames}}></ion-datetime>
              </ion-item>
              <ion-item>
                  <ion-label floating>{{'Time'}}</ion-label>
                  <ion-datetime id="time-selector" displayFormat="hh:mm a" 
                  [(ngModel)]="newReminder.time"></ion-datetime>
              </ion-item>
              <ion-item>
                  <ion-label floating>{{'Location'}}</ion-label>
                  <ion-input type="text" [(ngModel)]="newReminder.site" autocapitalize="off" 
                  (keyup)="handleKeys($event)"></ion-input>
              </ion-item>
          </div>
          <div class="reminder-content" *ngIf="!editMode">
              <ion-label class="content-data">
                  {{moment(reminder.start).format('DD MMM YYYY').toUpperCase()}} @ 
                  {{moment(reminder.time).format('hh:mm a').toUpperCase()}}</ion-label>
              <ion-label class="content-data">{{reminder.title}}</ion-label>
              <ion-label class="content-data">{{reminder.site}}</ion-label>
          </div>
      </ion-content>
      <ion-footer text-center no-border>
            <ion-toolbar no-border >    
              <button *ngIf="editMode" ion-button full color="std-button" class="blue-button" (click)="takeAction()" 
              [disabled]="!(newReminder.site && newReminder.time && newReminder.start && newReminder.title)">{{'SET APPOINTMENT'}}</button>
              <button *ngIf="!editMode" ion-button full color="std-button" class="blue-button" (click)="takeAction()">{{'EDIT APPOINTMENT'}}</button>
            </ion-toolbar>
      </ion-footer>
    `
    }),
    __metadata("design:paramtypes", [Events,
        NavController,
        NavParams,
        Keyboard,
        AppConfig,
        AppointmentsService,
        TranslatorService])
], EditAppointmentPage);
export { EditAppointmentPage };

//# sourceMappingURL=edit-appointment.js.map
