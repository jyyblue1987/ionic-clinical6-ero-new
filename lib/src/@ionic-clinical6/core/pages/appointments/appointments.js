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
import { NavController, ModalController, Events } from 'ionic-angular';
import * as moment from 'moment';
import { AppointmentsService } from './appointments.service';
import { EditAppointmentPage } from './edit/edit-appointment';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
import { AlertModalPage } from '../../modal/alert-modal';
let AppointmentsPage = class AppointmentsPage {
    constructor(event, nav, reminders, translatorService, appConfig, modalCtrl) {
        this.event = event;
        this.nav = nav;
        this.reminders = reminders;
        this.translatorService = translatorService;
        this.appConfig = appConfig;
        this.modalCtrl = modalCtrl;
        this.moment = moment;
        this.demoMode = true;
        this.dateView = true;
        this.monthAppointments = [];
        this.todayAppointments = [];
        this.todayAppointmentsDemo = [];
        this.monthAppointmentsDemo = [];
        this.records = [];
        this.isUpdating = false;
        this.tutorialVideoUrl = 'https://www.youtube.com/embed/OU-cIoqKw-0?rel=0&controls=1&showinfo=0&autoplay=1&start=2';
        this.items = [];
        this.cycles = [];
        this.monthAppointments = [];
        this.todayAppointments = [];
    }
    ngOnInit() {
        this.appConfig.calendarMode = 'date';
        this.appConfig.calendarReady = false;
    }
    ionViewWillEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reminders.getReminderRules();
            this.tutorialDay = moment().date();
            this.tutorialMonth = moment().month();
            this.tutorialYear = moment().year();
            if (this.appConfig.calendarMode) {
                if (this.appConfig.calendarMode === 'month') {
                    this.mode = this.appConfig.calendarMode;
                    this.ready = this.appConfig.calendarReady;
                }
                else
                    this.mode = this.appConfig.calendarMode;
            }
            if (this.selectedDate) {
                this.updateToday();
                return;
            }
            this.event.subscribe('selected-date', (date) => {
                this.selectedDate = date;
                this.currentDate = moment(this.selectedDate).format('dddd, DD MMM YYYY');
            });
            this.fetchAppointmentList();
            this.ready = true;
            this.todayDate = moment().format('dddd, DD MMM YYYY');
        });
    }
    ionViewDidLoad() {
        // provajred
        this.records = [];
        const self = this;
        this.currentDate = moment(this.selectedDate).format('dddd, DD MMM YYYY');
    }
    ionViewDidLoadOld() {
        this.currentDate = moment(this.selectedDate).format('dddd, DD MMM YYYY');
        // Mock record list
        // this.records = RECORDS;
    }
    /**
     * Switch the calendar to month view.
     */
    switchToMonth() {
        this.currentDate = moment(this.selectedDate).format('dddd, DD MMM YYYY');
        if (this.mode === 'month') {
            this.ready = true;
            return;
        }
        this.mode = 'month';
        if (this.selectedDate)
            this.selectedDate = null;
        this.ready = true;
        // this.dateView = false;
    }
    /**
     * Switch the calendar to date view.
     * @param opt Optional boolean parameter for enabling the refresh of the appointments list.
     */
    switchToDate(opt) {
        this.currentDate = moment(this.selectedDate).format('dddd, DD MMM YYYY');
        if (this.mode === 'date')
            return;
        this.mode = 'date';
        if (opt) {
            //  this.todayAppointments = [];
            //  this.monthAppointments = [];
            this.fetchAppointmentList();
        }
        // this.dateView = true;
    }
    goBack() {
        this.selectedDate = null;
        this.nav.pop();
    }
    /**
     * Updates the list of today's appointments.
     */
    updateToday() {
        this.todayAppointments = [];
        this.reminders.getAppointmentsByDate(moment(this.selectedDate).format('YYYY-MM-DD'))
            .then(dateAppointments => {
            this.todayAppointments = [];
            for (let dateAppointment of dateAppointments)
                this.todayAppointments.push(dateAppointment);
            this.isUpdating = false;
            this.ready = true;
        })
            .catch(reason => {
            console.log(reason);
            this.isUpdating = false;
        });
    }
    /**
     * Retrieves all the appointments from the platform updating the local data structures.
     */
    fetchAppointmentList() {
        this.monthAppointments = [];
        this.todayAppointments = [];
        if (this.isUpdating)
            return;
        this.isUpdating = true;
        this.reminders.getAppointments()
            .then(monthAppointments => {
            this.monthAppointments = monthAppointments;
            this.isUpdating = false;
            this.ready = true;
        })
            .catch(reason => {
            console.log(reason);
            this.isUpdating = false;
        });
        this.reminders.getAppointmentsByDate(moment().format('YYYY-MM-DD'))
            .then(dateAppointments => {
            this.todayAppointments = [];
            for (let dateAppointment of dateAppointments)
                this.todayAppointments.push(dateAppointment);
            this.isUpdating = false;
        })
            .catch(reason => {
            console.log(reason);
            this.isUpdating = false;
        });
    }
    /**
     * Fills the local data structure with the today's appointments.
     * @param event Calendar event.
     * @param day Selected date.
     */
    addDayAppointments(event, day) {
        let current;
        if (day)
            current = moment(day).format('DD/MM/YYYY');
        else
            current = moment().format('DD/MM/YYYY');
        if (moment(event.start).format('DD/MM/YYYY') === current)
            //   this.setToDisplayAndPush(event);
            this.todayAppointments.push(event);
    }
    /**
     * Redirect to the Edit Appointent Page.
     */
    newReminder() {
        this.nav.push(EditAppointmentPage, { mode: true });
    }
    /**
     * Updates the Day Appointments before switching to Date View.
     * @param data Calendar events.
     */
    showAllEvents(data) {
        // switch to date view
        // to show event list of different day
        // if (data['events'].length <= 0 || this.isUpdating) return;
        if (data['events'].length <= 0)
            return;
        // this.isUpdating = true;
        this.todayAppointments = [];
        this.selectedDate = data['day']['date'];
        data['events'].forEach(event => {
            this.addDayAppointments(event, data['day']['date']);
        });
        // this.isUpdating = false;
        this.switchToDate();
    }
    showReminder(reminder) {
        this.appConfig.calendarMode = 'month';
        this.nav.push(EditAppointmentPage, { mode: false, data: reminder });
    }
    translate(string_key) {
        let s = this.translatorService.getInnerHTML(string_key);
        return s || string_key;
    }
    translateWithTags(string_key) {
        let s = this.translatorService.get(string_key);
        return s || string_key;
    }
    showError(title = 'Error', errorSubTitle, errorText) {
        AlertModalPage.show(this, { type: 'type_error', title: title, body: errorText, subTitle: errorSubTitle, cancelCallback: () => { } });
    }
};
AppointmentsPage = __decorate([
    Component({
        selector: 'appointments-page',
        template: `
      <ion-header>
          <app-toolbar [title]="'Appointments'" [backLabel]="'Back'"></app-toolbar>
      </ion-header>

      <ion-content>
          <div class="date-selector" no-margin no-padding ion-fixed>
              <ion-segment [(ngModel)]="mode">
                  <ion-segment-button value="date" (click)="switchToDate()">
                      {{'Day View'}}</ion-segment-button>
                  <ion-segment-button value="month" (click)="switchToMonth()">
                      {{'Month View'}}</ion-segment-button>
              </ion-segment>
              <ion-label class="current-date"*ngIf="mode=='date'">{{currentDate}}</ion-label>
              <ion-label class="current-date"*ngIf="mode=='month'">{{todayDate}}</ion-label>        
          </div>
          <!-- If date view -->
          <div class="appointment-list" no-margin no-padding *ngIf="mode=='date'">
              <ion-list class="list" *ngIf="todayAppointments.length > 0">
                  <ng-template ngFor let-appointment [ngForOf]="todayAppointments">
                      <button ion-button clear no-padding no-margin full class="progress-item" 
                          class="details-container" (click)="showReminder(appointment)">
                          <ion-grid fixed no-padding>
                              <ion-row>
                                  <ion-col col-2 no-padding>
                                      <img class="detail-icon" src=""/>
                                  </ion-col>
                                  <ion-col col-9 no-padding>
                                      <div class="detail-content">
                                          <div class="detail-dates">
                                              {{moment(appointment.time).format('hh:mm A').toUpperCase()}},
                                              {{moment(appointment.start).format('DD MMM YYYY').toUpperCase()}}
                                          </div>
                                          <div class="detail-title">{{appointment.title}}</div>
                                      </div>
                                  </ion-col>
                                  <!--<ion-col no-padding align-self-end class="icon-container">-->
                                  <ion-col no-padding class="arrow-col">
                                      <ion-icon class="arrow" name="arrow-forward"></ion-icon>
                                  </ion-col>
                              </ion-row>
                          </ion-grid>
                      </button>
                  </ng-template>
              </ion-list>
              <div class="no-appointments" *ngIf="todayAppointments.length == 0">
                  <img class="no-icon" src=""/>
                  <ion-label class="no-title">
                      {{'NO APPOINTMENTS'}}</ion-label>
                  <ion-label class="no-subtitle">
                      {{''}}</ion-label>
              </div>
          </div>
          <!-- If month view -->
          <div class="calendar-comp" *ngIf="mode=='month'">
              <ion-spinner name="ios" class="custom-spinner" *ngIf="!ready"></ion-spinner>                                
              <calendar-component [legend]="true" [events]="monthAppointments" [records]="records"
               (onEvent)="showAllEvents($event)" *ngIf="ready"></calendar-component>
          </div>
      </ion-content>

      <!--<ion-footer>
          <button ion-button class="blue-button" (click)="newReminder()">SET UP NEW REMINDER</button>
      </ion-footer>-->
      <ion-footer text-center no-border>
            <ion-toolbar no-border >    
              <button ion-button full color="std-button" class="blue-button" (click)="newReminder()">
                  {{'SET APPOINTMENT'}}</button>
            </ion-toolbar>
      </ion-footer>
    `
    }),
    __metadata("design:paramtypes", [Events,
        NavController,
        AppointmentsService,
        TranslatorService,
        AppConfig,
        ModalController])
], AppointmentsPage);
export { AppointmentsPage };
const EVENTS = [
    {
        'start': { day: 28, month: 4, year: 2017 },
        'time': { hour: 10, minute: 0 },
        'title': 'Appointment w/ Dr. Tom',
        'site': 'Clinic 1'
    },
    {
        'start': { day: 5, month: 4, year: 2017 },
        'time': { hour: 22, minute: 0 },
        'title': 'Appointment w/ Dr. Anderson',
        'site': 'Clinic 2'
    },
    {
        'start': { day: 12, month: 4, year: 2017 },
        'time': { hour: 4, minute: 0 },
        'title': 'Appointment w/ Dr. Smith',
        'site': 'Clinic 3'
    }
];
const RECORDS = [
    {
        'date': '2017-05-10T21:59:59.999Z',
        'use': true
    },
    {
        'date': '2017-05-30T21:59:59.999Z',
        'use': false
    }
];

//# sourceMappingURL=appointments.js.map
