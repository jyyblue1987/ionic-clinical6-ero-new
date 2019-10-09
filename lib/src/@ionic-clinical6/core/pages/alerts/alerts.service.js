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
import { Injectable } from '@angular/core';
import { clinical6, Notification, mobileUserService } from 'clinical6';
import { AppConfig } from '../../config';
import { AlertsFactory } from './alert.factory';
import { NgZone } from '@angular/core';
let AlertsService = class AlertsService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.animationOpt = AppConfig.animationOpt;
    }
    userId() {
        return clinical6.user.id;
    }
    /**
     * Retrieve all the alerts.
     */
    getAlerts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield mobileUserService.getNotifications();
                this.alerts = response.filter(e => {
                    return e.attributes.status !== 'completed';
                }).map(element => {
                    console.log(element);
                    return new Notification(element);
                });
                console.log(this.alerts);
                return this.alerts;
            }
            catch (error) {
                console.log('Error in getAlerts', error);
            }
        });
    }
    /**
     * Returns cached alerts instead of performing a new request.
     */
    cachedAlerts() {
        if (this.alerts) {
            return Promise.resolve(this.alerts);
        }
        return this.getAlerts();
    }
    /**
     * Remove the selected alert.
     * @param {Notification} message The selected Notification
     */
    removeAlert(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                message.status = 'completed';
                yield message.save();
                return this.alerts = this.alerts.filter(curr => {
                    return (curr.id !== message['id']);
                });
            }
            catch (error) {
                console.log('Error in removeAlert', error);
            }
        });
    }
    // cannot inject the nav controller into the service
    /**
     * Used for the alert routing. Opens the page associated to the action.
     * @param nav Navigation Controller.
     * @param data Callback data that comes from platform.
     */
    goTakeAction(nav, data) {
        this.ngZone.run(() => __awaiter(this, void 0, void 0, function* () {
            let _action = data.content ? data.content.action : data.action ? data.action : null;
            let _content = data.content ? data.content.action_object : data.action_object ? data.action_object : null;
            var matchingItem = AlertsFactory.ActionsMap.find((item) => {
                return item.action === _action;
            });
            if (matchingItem) {
                let options = yield this.callback();
                nav.push(matchingItem.page, options, this.animationOpt);
            }
            else {
                console.log(`could not handle alert with action '${_action}' and action_object '${_content}'`);
            }
        }));
    }
    // override this to add several actions before redirecting the user to a new page
    callback() {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
};
AlertsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgZone])
], AlertsService);
export { AlertsService };

//# sourceMappingURL=alerts.service.js.map
