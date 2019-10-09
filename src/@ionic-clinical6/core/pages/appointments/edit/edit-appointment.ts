import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import * as moment from 'moment';
import { AppointmentsService } from '../appointments.service';
import { TranslatorService } from '../../../translator/translator.service';
import { AppConfig } from '../../../config';


@Component({
    selector: 'edit-appointment-page',
    templateUrl: 'edit-appointment.html'
})
export class EditAppointmentPage {

    moment = moment;

    newReminder = {title: null, start: null, time: null, site: null, id: null};
    reminder = {};
    editMode: boolean;
    isUpdating = false;
    monthShortNames;

    content = {};

    constructor(
        public event: Events,
        public nav: NavController,
        public navParam: NavParams,
        public keyboard: Keyboard,
        public appConfig: AppConfig,
        public reminders: AppointmentsService,
        public translatorService: TranslatorService) {

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
            time:  moment().format('HH:mm'),
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
           this.content['subtitle']  = 'Set Reminder Subtitle';
           this.content['button'] = 'SAVE';

        }
        else {
           this.content['title'] = 'Ucoming Text';
           this.content['subtitle']  = null;
           this.content['button'] = 'Edit';
        }
    }

    handleKeys(event: KeyboardEvent) {
        if (event.keyCode === 13) this.keyboard.close();
    }

    goBack() {
        // this.appConfig.calendarMode = 'date';
        this.nav.pop();
    }

    /**
     * Save the new appointment.
     */
    async save() {
        if (this.isUpdating) return;

        this.editMode = true;
        this.initializeContent();
        // let reminder = Object.assign(this.newReminder, {});
        // reminder.time = moment(reminder.time, 'h:mm A').format('HH:mm');
        this.isUpdating = true;

        await this.reminders.saveAppointment(this.newReminder)
            .catch ( reason => {
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
}