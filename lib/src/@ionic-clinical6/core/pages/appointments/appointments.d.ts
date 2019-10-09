import { NavController, ModalController, Events } from 'ionic-angular';
import * as moment from 'moment';
import { AppointmentsService } from './appointments.service';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
export declare class AppointmentsPage {
    event: Events;
    nav: NavController;
    reminders: AppointmentsService;
    translatorService: TranslatorService;
    appConfig: AppConfig;
    modalCtrl: ModalController;
    moment: typeof moment;
    demoMode: boolean;
    currentDate: string;
    todayDate: string;
    selectedDate: any;
    dateView: boolean;
    mode: string;
    monthAppointments: any[];
    todayAppointments: any[];
    todayAppointmentsDemo: any[];
    monthAppointmentsDemo: any[];
    records: any[];
    isUpdating: boolean;
    tutorialData: any;
    tutorialVideoUrl: string;
    items: any[];
    cycles: any[];
    ready: boolean;
    tutorialDay: any;
    tutorialMonth: any;
    tutorialYear: any;
    constructor(event: Events, nav: NavController, reminders: AppointmentsService, translatorService: TranslatorService, appConfig: AppConfig, modalCtrl: ModalController);
    ngOnInit(): void;
    ionViewWillEnter(): Promise<void>;
    ionViewDidLoad(): void;
    ionViewDidLoadOld(): void;
    /**
     * Switch the calendar to month view.
     */
    switchToMonth(): void;
    /**
     * Switch the calendar to date view.
     * @param opt Optional boolean parameter for enabling the refresh of the appointments list.
     */
    switchToDate(opt?: boolean): void;
    goBack(): void;
    /**
     * Updates the list of today's appointments.
     */
    updateToday(): void;
    /**
     * Retrieves all the appointments from the platform updating the local data structures.
     */
    fetchAppointmentList(): void;
    /**
     * Fills the local data structure with the today's appointments.
     * @param event Calendar event.
     * @param day Selected date.
     */
    addDayAppointments(event: any, day?: string): void;
    /**
     * Redirect to the Edit Appointent Page.
     */
    newReminder(): void;
    /**
     * Updates the Day Appointments before switching to Date View.
     * @param data Calendar events.
     */
    showAllEvents(data: any): void;
    showReminder(reminder: any): void;
    translate(string_key: any): any;
    translateWithTags(string_key: any): any;
    showError(title: string, errorSubTitle: any, errorText: any): void;
}
