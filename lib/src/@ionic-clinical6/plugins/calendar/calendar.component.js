var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
let CalendarComponent = class CalendarComponent {
    constructor() {
        this.onEvent = new EventEmitter();
        this.today = moment();
        this.current_month = moment().format('MMM YYYY');
        setTimeout(() => {
            this.colorDayNumbers();
        }, 200);
    }
    navigate(dateView) {
        this.current_month = moment(dateView).format('MMM YYYY');
        setTimeout(() => {
            this.colorDayNumbers();
        }, 200);
    }
    eventAction(dayData) {
        this.onEvent.emit({ day: dayData['day'], events: dayData['day']['events'] });
    }
    colorDayNumbers() {
        // to change when records are available
        if (!this.records || this.records.length === 0)
            return;
        let monthRecords = [];
        let viewMonth = parseInt(moment(this.current_month, 'MMM YYYY').format('MM')) - 1;
        for (let record of this.records) {
            let recordMonth = new Date(record['date']).getMonth();
            if (recordMonth === viewMonth)
                monthRecords.push(record);
        }
        let days = document.getElementsByClassName('cal-day-number');
        for (let record of monthRecords) {
            let current = new Date(record['date']).getDate();
            for (let i = 0; i < days.length; i++) {
                if (current === parseInt(days[i].innerHTML) &&
                    !days[i].parentElement.parentElement.classList.contains('cal-out-month')) {
                    if (record['use'])
                        days[i].classList.add('green-colored');
                    else
                        days[i].classList.add('red-colored');
                }
            }
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "legend", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarComponent.prototype, "events", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "records", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CalendarComponent.prototype, "onEvent", void 0);
CalendarComponent = __decorate([
    Component({
        selector: 'calendar-component',
        template: `
      <div class="month-bar">
          <ion-row>
              <button mwlCalendarPreviousView [(viewDate)]="today" [view]="'month'" (viewDateChange)="navigate($event)">
                 <ion-icon name="arrow-back" class="arrow"></ion-icon>
              </button>
              <ion-label class="month-name">{{current_month}}</ion-label>
              <button mwlCalendarNextView [(viewDate)]="today" [view]="'month'" (viewDateChange)="navigate($event)">
                 <ion-icon name="arrow-forward" class="arrow"></ion-icon>
              </button>
          </ion-row>
      </div>
      <mwl-calendar-month-view [viewDate]="today" [events]="events" (dayClicked)="eventAction($event)"></mwl-calendar-month-view>
      <div class="legend" *ngIf="legend">
          <ion-row>
              <div class="legend-title-container">
                  <ion-label class="legend-title">LEGEND</ion-label>
              </div>
              <div class="legend-content">
                  <ion-row style="padding-top: 4rem;">
                      <div class="blue-point"></div>
                      <ion-label class="appointment-label">Appointment</ion-label>
                  </ion-row>
              </div>
          </ion-row>
      </div>
    `
    }),
    __metadata("design:paramtypes", [])
], CalendarComponent);
export { CalendarComponent };

//# sourceMappingURL=calendar.component.js.map
