import { Injectable } from '@angular/core';
import { Client, clinical6, Notification, mobileUserService } from 'clinical6';
import { NavController } from 'ionic-angular';
import { AppConfig } from '../../config';
import { PushService } from './push.service';
import { AlertsFactory } from './alert.factory';
import { NgZone } from '@angular/core';
import { shimHostAttribute } from '@angular/platform-browser/src/dom/dom_renderer';

@Injectable()
export class AlertsService {

  public alerts: Notification[];
  animationOpt: any;
  constructor(
    private ngZone: NgZone
  ) {
    this.animationOpt = AppConfig.animationOpt;
  }

  private userId() {
    return clinical6.user.id;
  }

  /**
   * Retrieve all the alerts.
   */
  async getAlerts(): Promise<Notification[]> {
    try {
      let response = await mobileUserService.getNotifications();
      this.alerts = response.filter(e => {
        return e.attributes.status !== 'completed';
      }).map(element => {
        console.log(element);
        return new Notification(element);
      });
      console.log(this.alerts);
      return this.alerts;
    } catch (error) {
      console.log('Error in getAlerts', error);
    }
  }

  /**
   * Returns cached alerts instead of performing a new request.
   */
  cachedAlerts(): Promise<any[]>  {
    if (this.alerts) {
      return Promise.resolve(this.alerts);
    }
    return this.getAlerts();
  }

  /**
   * Remove the selected alert.
   * @param {Notification} message The selected Notification
   */
  async removeAlert(message: Notification) {
    try {
      message.status = 'completed';
      await message.save();
        return this.alerts = this.alerts.filter(curr => {
          return (curr.id !== message['id']);
        });
    } catch (error) {
      console.log('Error in removeAlert', error);
    }
  }

  // cannot inject the nav controller into the service
  /**
   * Used for the alert routing. Opens the page associated to the action.
   * @param nav Navigation Controller.
   * @param data Callback data that comes from platform.
   */
  goTakeAction(nav: NavController, data) {
    this.ngZone.run(async () => {

      let _action = data.content ? data.content.action : data.action ?  data.action : null;
      let _content = data.content ? data.content.action_object : data.action_object ? data.action_object : null;
      var matchingItem = AlertsFactory.ActionsMap.find((item) => {
        return item.action === _action;
      });
      if (matchingItem) {
        let options = await this.callback();
        nav.push(matchingItem.page, options, this.animationOpt);
      }
      else {
        console.log(`could not handle alert with action '${_action}' and action_object '${_content}'`);
      }
  });
  }
  // override this to add several actions before redirecting the user to a new page
  async callback() {
    return {};
  }
}