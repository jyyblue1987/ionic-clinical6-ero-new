import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, Events } from 'ionic-angular';
import * as moment from 'moment';
import { AppointmentsService } from './appointments.service';
import { EditAppointmentPage } from './edit/edit-appointment';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
import { AlertModalPage } from '../../modal/alert-modal'


@Component({
    selector: 'appointments-page',
    templateUrl: 'appointments.html'
})
export class AppointmentsPage {

    moment = moment;
    demoMode = true;

    currentDate: string;
    todayDate: string;
    selectedDate;
    dateView: boolean = true;
    mode: string;
    monthAppointments = [];
    todayAppointments = [];
    todayAppointmentsDemo = [];
    monthAppointmentsDemo = [];
    records = [];
    isUpdating: boolean = false;
    tutorialData;
    tutorialVideoUrl = 'https://www.youtube.com/embed/OU-cIoqKw-0?rel=0&controls=1&showinfo=0&autoplay=1&start=2';
    items = [];
    cycles = [];
    ready: boolean;
    tutorialDay;
    tutorialMonth;
    tutorialYear;


    constructor(
        public event: Events,
        public nav: NavController,
        public reminders: AppointmentsService,
        public translatorService: TranslatorService,
        public appConfig: AppConfig,
        public modalCtrl: ModalController,
        ) {
                this.monthAppointments = [];
                this.todayAppointments = [];
    }

    ngOnInit() {
        this.appConfig.calendarMode = 'date';
        this.appConfig.calendarReady = false;
    }

    async ionViewWillEnter() {
        await this.reminders.getReminderRules();
        this.tutorialDay = moment().date();
        this.tutorialMonth = moment().month();
        this.tutorialYear = moment().year();
        if (this.appConfig.calendarMode) {
            if ( this.appConfig.calendarMode === 'month') {
                this.mode = this.appConfig.calendarMode;
                this.ready = this.appConfig.calendarReady;
            }
            else this.mode = this.appConfig.calendarMode;
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
        if (this.selectedDate) this.selectedDate = null;
        this.ready = true;
        // this.dateView = false;
    }

    /**
     * Switch the calendar to date view.
     * @param opt Optional boolean parameter for enabling the refresh of the appointments list.
     */
    switchToDate(opt?: boolean) {
        this.currentDate = moment(this.selectedDate).format('dddd, DD MMM YYYY');
        if (this.mode === 'date') return;
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
        .then( dateAppointments => {
            this.todayAppointments = [];
            for (let dateAppointment of dateAppointments)
                this.todayAppointments.push(dateAppointment);
            this.isUpdating = false;
            this.ready = true;
        })
        .catch( reason => {
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
        if (this.isUpdating) return;
        this.isUpdating = true;

        this.reminders.getAppointments()
        .then( monthAppointments => {
            this.monthAppointments = monthAppointments;
            this.isUpdating = false;
            this.ready = true;
        })
        .catch( reason => {
            console.log(reason);
            this.isUpdating = false;
        });

        this.reminders.getAppointmentsByDate(moment().format('YYYY-MM-DD'))
        .then( dateAppointments => {
            this.todayAppointments = [];
            for (let dateAppointment of dateAppointments)
                this.todayAppointments.push(dateAppointment);
            this.isUpdating = false;
        })
        .catch( reason => {
            console.log(reason);
            this.isUpdating = false;
        });
    }

    /**
     * Fills the local data structure with the today's appointments.
     * @param event Calendar event.
     * @param day Selected date.
     */
    addDayAppointments(event: any, day?: string) {
        let current;
        if (day) current = moment(day).format('DD/MM/YYYY');
        else current = moment().format('DD/MM/YYYY');
        if (moment(event.start).format('DD/MM/YYYY') === current)
        //   this.setToDisplayAndPush(event);
            this.todayAppointments.push(event);
    }

    /**
     * Redirect to the Edit Appointent Page.
     */
    newReminder() {
        this.nav.push(EditAppointmentPage, {mode: true});
    }

    /**
     * Updates the Day Appointments before switching to Date View.
     * @param data Calendar events.
     */
    showAllEvents(data) {
        // switch to date view
        // to show event list of different day
        // if (data['events'].length <= 0 || this.isUpdating) return;
        if (data['events'].length <= 0) return;

        // this.isUpdating = true;
        this.todayAppointments = [];
        this.selectedDate = data['day']['date'];
        data['events'].forEach(event => {
            this.addDayAppointments(event, data['day']['date']);
        });
        // this.isUpdating = false;
        this.switchToDate();
    }

    showReminder(reminder: any) {
       this.appConfig.calendarMode = 'month';
       this.nav.push(EditAppointmentPage, {mode: false, data: reminder});
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

}

const EVENTS = [
 {
  'start': {day: 28, month: 4, year: 2017},
  'time': {hour: 10, minute: 0},
  'title': 'Appointment w/ Dr. Tom',
  'site': 'Clinic 1'
 },
 {
  'start': {day: 5, month: 4, year: 2017},
  'time': {hour: 22, minute: 0},
  'title': 'Appointment w/ Dr. Anderson',
  'site': 'Clinic 2'
 },
 {
  'start': {day: 12, month: 4, year: 2017},
  'time': {hour: 4, minute: 0},
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