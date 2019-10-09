import { NavController, NavParams, Events } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import * as moment from 'moment';
import { AppointmentsService } from '../appointments.service';
import { TranslatorService } from '../../../translator/translator.service';
import { AppConfig } from '../../../config';
export declare class EditAppointmentPage {
    event: Events;
    nav: NavController;
    navParam: NavParams;
    keyboard: Keyboard;
    appConfig: AppConfig;
    reminders: AppointmentsService;
    translatorService: TranslatorService;
    moment: typeof moment;
    newReminder: {
        title: any;
        start: any;
        time: any;
        site: any;
        id: any;
    };
    reminder: {};
    editMode: boolean;
    isUpdating: boolean;
    monthShortNames: any;
    content: {};
    constructor(event: Events, nav: NavController, navParam: NavParams, keyboard: Keyboard, appConfig: AppConfig, reminders: AppointmentsService, translatorService: TranslatorService);
    ionViewDidLoad(): void;
    /**
     * Change the labels according to the type of the page: Edit page or New appointment page(Edit Mode or Save mode).
     */
    initializeContent(): void;
    handleKeys(event: KeyboardEvent): void;
    goBack(): void;
    /**
     * Save the new appointment.
     */
    save(): Promise<void>;
    /**
     * Prepare the edit mode.
     */
    edit(): void;
    /**
     * Switch between Edit Mode and Save Mode.
     */
    takeAction(): void;
    translate(string_key: any): string;
}
