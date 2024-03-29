import { Injectable } from '@angular/core';
import { clinical6, ruleService, Client } from 'clinical6';
import * as moment from 'moment';
import { App, MenuController, LoadingController } from 'ionic-angular';
import { AppLoginService } from '../../login.service';
import { UtilsService } from '../../utils.service';

@Injectable()
export class AppointmentsService {

  /** @type {Array} monthAppointments - Local data structure for the month appointments  */
  monthAppointments: Array<any>;
  /** @type {Array} todayAppointments - Local data structure for the month appointments  */
  todayAppointments: Array<any>;
  /** appointments - Local data structure for the appointments  */
  appointments;
  /** reminderRules - Local data structure for the reminder rules  */
  reminderRules = [];

  constructor(
              public app: App,
              public loginSvc: AppLoginService,
              public menu: MenuController,
              public utilsSvc: UtilsService) {
    this.monthAppointments = [];
    this.appointments = {};
  }

  /**
   * Retrieve all the reminder rules available on the platform.
   */
  async getReminderRules() {
    try {
      if (typeof this.reminderRules !== 'undefined' && this.reminderRules.length > 0) {
        return this.reminderRules;
      }
      else {
        let rules = await ruleService.get();
        this.reminderRules = rules as any;
        return this.reminderRules;
      }
    } catch (error) {
      console.log('Error fetching the rules', error);
    }
  }

  /**
   * Retrieve a specific appointment.
   * @param appointmentId The id of the appointment.
   */
  async getAppointment(appointmentId) {
    try {
      let data = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/reminder_events/${appointmentId}`);
      let appointment = data.data;
      appointment.attributes.date = moment.parseZone(moment(moment.utc(appointment.attributes.date).toDate()));
      return appointment;
    } catch (e) {
      throw (e);
    }
  }

  /**
   * Retrieve all the appointments stored on the platform.
   */
  async getAppointments() {
    this.utilsSvc.presentLoading();
    try {
      this.appointments = {};
      let month_appointment = this.monthAppointments = [];
      const rule = await this.reminderRules.find( (rule) => {
        return rule.permanentLink === 'appointments';
      });
      let data = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/reminder_events?filters[rule_id]=${rule.id}`);
      // let data = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/reminder_events?filters[rule_id]=2`);
      if (data && data.data) {
        month_appointment = data.data.sort((a, b) => {
          return moment(a.attributes.date).diff(b.attributes.date);
        });
        console.log('appointments list: ', month_appointment);
        month_appointment.forEach(appointment => {
          // check if appointment is new
          let status = this.status(appointment);
          appointment.attributes.date = moment.parseZone(moment(moment.utc(appointment.attributes.date).toDate()));
          if (status.value === 'new') {
            this.addAppointment(appointment);
          }
          else if (status.value === 'updated') {
            this.updateAppointment(appointment, status.index);
          }
        });
      }
      this.utilsSvc.dismissLoader();
      return this.monthAppointments;
    } catch (e) {
      this.utilsSvc.dismissLoader();
      console.log(e);
    }

  }

  /**
   * Retrive appointments for a specific date from platform.
   * @param permanentLink The appointment's permanent link.
   * @param date The selected date.
   */
  async getRemindersByDate(permanentLink, date) {
    let events = await ruleService.getEventsByDate(permanentLink, date);
    if (events.length > 0) {
      let sortedEvents = events.sort((a, b) => {
        return moment(b.date).diff(a.date);
      });
      return sortedEvents[0];
    } else {
      return null;
    }
  }

  /**
   * Retrieve appointments for a specific date from local data structure.
   * @param date The selected date.
   */
  async getAppointmentsByDate(date) {
    if (this.appointments && this.appointments[date])
      return this.appointments[date];
    else {
      await this.getAppointments();
      return this.appointments[date] || [];
    }
  }

  /**
   * Add an appointment to the local data structure.
   * @param appointment The appointment data.
   */
  addAppointment(appointment) {
    // let start = moment(appointment.date).toDate();
    let date = moment(appointment.attributes.date).format('YYYY-MM-DD');
    let start = moment(appointment.attributes.date).toDate();
    let calEvent = {
      start: start,
      time: start, // time and start share the SAME value
      upcoming_date: moment(appointment.attributes.date).format(),
      color: {
        primary: 'blue',
        secondary: 'blue'
      },
      // title: appointment.extras.title,
      // site: appointment.extras.site,
      title: appointment.attributes.extras ? appointment.attributes.extras.title : '',
      site: appointment.attributes.extras ? appointment.attributes.extras.site : '',
      id: appointment.id,
      // updated_at: moment(appointment.updated_at)
      updated_at: moment(appointment.attributes.updated_at)
    };
    if (!this.appointments[date])
      this.appointments[date] = [];
    this.appointments[date].push(calEvent); // add in cache
    this.monthAppointments.push(calEvent);
  }

  /**
   * Update the appointment locally.
   * @param appointment The selected appointment.
   * @param index The local index of the appointment.
   */
  updateAppointment(appointment, index) {
    var monthAppointments = this.monthAppointments[index];
    if (monthAppointments.id !== appointment.id) {
      console.error('updateAppointment, ids don\'t match, something went wrong');
      return;
    }
    // let start = moment(appointment.date).toDate();
    let start = moment(appointment.attributes.date).toDate();
    monthAppointments.start = start;
    monthAppointments.time = start;
    monthAppointments.upcoming_date = moment.parseZone(appointment.attributes.date);
    // monthAppointments.title = appointment.extras.title;
    // monthAppointments.site = appointment.extras.site;
    monthAppointments.title = appointment.attributes.extras.title;
    monthAppointments.site = appointment.attributes.extras.site;
    // monthAppointments.updated_at = moment(appointment.updated_at);
    monthAppointments.updated_at = moment(appointment.attributes.updated_at);
  }

  /**
   * Save the appointment to the platform.
   * @param appointment The new appointment.
   */
  async saveAppointment(appointment) {
    let reminderRule = await this.reminderRules.find( (rule) => {
      return rule.permanentLink === 'appointments';
    });
    console.log('ReminderService, save in', appointment);
    // let start = moment(appointment.start);
    // let time = moment(appointment.time);
    // moment(moment(`${appointment.start}, ${appointment.time}`, 'YYYY-MM-DD, HH:mm').toISOString()).format();
    let format = `${appointment.start}, ${appointment.time}`;
    let date = moment(format, 'YYYY-MM-DD, HH:mm').toISOString(); // start.hour(time.hour()).minute(time.minute());

    let event = {
      model_name: 'MobileUser',
      data: {
        type: 'reminder__events',
        attributes: {
          date: date,
          extras: {
            'title': appointment.title || '',
            'site': appointment.site || ''
          }
        },
        relationships: {
          mobile_users: {
            data: {
              type: 'mobile_users',
              id: clinical6.user.id
            }
          },
          reminder__rules: {
            data: {
              type: 'reminder__rules',
              id: reminderRule.id
            }
          }
        }
      }
    };
    console.log('ReminderService, save out', event);
    let rule = 'appointments';
    let response;
    try {
      if ( appointment.id ) {
          response = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/reminder_events/${appointment.id}`, 'PATCH', event);
          let status = this.status(response.data);
          if (status.index < 0) {
            let msg = 'ReminderService, updateEvent error, could not find the index of the index of the appointment, something went wrong';
            console.error(msg);
            throw(msg);
          }
          else {
            this.updateAppointment( response.data, status.index );
            console.log('appointment successfully updated');
            return response;
          }
      } else {
        response = await clinical6.fetch(`/v3/mobile_users/${clinical6.user.id}/reminder_events`, 'POST', event);
          console.log('ReminderService, insertEvent success', response);
          // find the appointment
          let status = this.status(response.data);
          if (status.value !== 'new') {
            let msg = 'ReminderService, insertEvent error, added a new appointment but it is not found as new, something went wrong';
            console.error(msg);
            return msg;
          }
          else {
            this.addAppointment ( response.data );
            console.log('appointment successfully created');
            return response;
          }
        }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Check the status of the appointment.
   * @param appointment The selected appointment.
   */
  status(appointment) {
    // for (let [index, monthAppointment] of this.monthAppointments.entries()) { // does not work in ts ...
    for (let index = 0; index < this.monthAppointments.length; index++) {
      let monthAppointment = this.monthAppointments[index];

      if (monthAppointment.id === appointment.id) {
        // appointment is already stored
        // if ( monthAppointment.updated_at.isBefore(appointment.updated_at) ) {
        if (monthAppointment.updated_at.isBefore(appointment.attributes.updated_at)) {
          // stored appointment is outdated
          // this.monthAppointments.splice(index, 1);
          return { value: 'updated', index: index };
        }
        else
          // appointment is already stored
          return { value: 'existing', index: index };
      }
    }
    // appointed is not stored
    return { value: 'new', index: -1 };
  }
}

export const DATA = {
  data:
    [
      {
        'id': '15981',
        'type': 'reminder__events',
        'attributes': {
          'date': '2018-04-24T13:50:00Z',
          'status': 5,
          'extras': {
            'title': 'first ev',
            'site': 'Apple-Review Site'
          },
          'created_at': '2018-04-24T13:50:00Z',
          'updated_at': '2018-04-24T13:50:00Z'
        },
      },
      {
        'id': '15982',
        'type': 'reminder__events',
        'attributes': {
          'date': '2018-04-24T15:50:00Z',
          'status': 5,
          'extras': {
            'title': 'second ev',
            'site': 'Apple-Review Site2'
          },
          'created_at': '2018-04-24T15:50:00Z',
          'updated_at': '2018-04-24T15:50:00Z'
        }
      },
      {
        'id': '15983',
        'type': 'reminder__events',
        'attributes': {
          'date': '2018-04-25T15:50:00Z',
          'status': 5,
          'extras': {
            'title': 'third ev',
            'site': 'Apple-Review Site2'
          },
          'created_at': '2018-04-25T15:50:00Z',
          'updated_at': '2018-04-25T15:50:00Z'
        }
      },
      {
        'id': '15984',
        'type': 'reminder__events',
        'attributes': {
          'date': '2018-04-25T15:50:00Z',
          'status': 5,
          'extras': {
            'title': 'fourth ev',
            'site': 'Apple-Review Site2'
          },
          'created_at': '2018-04-25T18:50:00Z',
          'updated_at': '2018-04-25T18:50:00Z'
        }
      }
    ]
};