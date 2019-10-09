import { App, MenuController } from 'ionic-angular';
import { AppLoginService } from '../../login.service';
import { UtilsService } from '../../utils.service';
export declare class AppointmentsService {
    app: App;
    loginSvc: AppLoginService;
    menu: MenuController;
    utilsSvc: UtilsService;
    /** @type {Array} monthAppointments - Local data structure for the month appointments  */
    monthAppointments: Array<any>;
    /** @type {Array} todayAppointments - Local data structure for the month appointments  */
    todayAppointments: Array<any>;
    /** appointments - Local data structure for the appointments  */
    appointments: any;
    /** reminderRules - Local data structure for the reminder rules  */
    reminderRules: any[];
    constructor(app: App, loginSvc: AppLoginService, menu: MenuController, utilsSvc: UtilsService);
    /**
     * Retrieve all the reminder rules available on the platform.
     */
    getReminderRules(): Promise<any[]>;
    /**
     * Retrieve a specific appointment.
     * @param appointmentId The id of the appointment.
     */
    getAppointment(appointmentId: any): Promise<any>;
    /**
     * Retrieve all the appointments stored on the platform.
     */
    getAppointments(): Promise<any[]>;
    /**
     * Retrive appointments for a specific date from platform.
     * @param permanentLink The appointment's permanent link.
     * @param date The selected date.
     */
    getRemindersByDate(permanentLink: any, date: any): Promise<any>;
    /**
     * Retrieve appointments for a specific date from local data structure.
     * @param date The selected date.
     */
    getAppointmentsByDate(date: any): Promise<any>;
    /**
     * Add an appointment to the local data structure.
     * @param appointment The appointment data.
     */
    addAppointment(appointment: any): void;
    /**
     * Update the appointment locally.
     * @param appointment The selected appointment.
     * @param index The local index of the appointment.
     */
    updateAppointment(appointment: any, index: any): void;
    /**
     * Save the appointment to the platform.
     * @param appointment The new appointment.
     */
    saveAppointment(appointment: any): Promise<any>;
    /**
     * Check the status of the appointment.
     * @param appointment The selected appointment.
     */
    status(appointment: any): {
        value: string;
        index: number;
    };
}
export declare const DATA: {
    data: {
        'id': string;
        'type': string;
        'attributes': {
            'date': string;
            'status': number;
            'extras': {
                'title': string;
                'site': string;
            };
            'created_at': string;
            'updated_at': string;
        };
    }[];
};
