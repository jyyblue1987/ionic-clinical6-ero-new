import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import moment from 'moment';

@Component({
    selector: 'calendar-component',
    templateUrl: 'calendar.component.html'
})
export class CalendarComponent {

    @Input() legend: boolean;
    @Input() events: CalendarEvent[];
    @Input() records: any;
    @Output() onEvent: EventEmitter<any> = new EventEmitter<any>();
    today: any;
    current_month: string;

    constructor() {
       this.today = moment();
       this.current_month = moment().format('MMM YYYY');
       setTimeout(() => {
           this.colorDayNumbers();
       }, 200);
    }

    navigate(dateView: any) {
       this.current_month = moment(dateView).format('MMM YYYY');
       setTimeout(() => {
           this.colorDayNumbers();
       }, 200);
    }

    eventAction(dayData: any) {
       this.onEvent.emit({day: dayData['day'], events: dayData['day']['events']});
    }

    colorDayNumbers() {
        // to change when records are available
       if (!this.records || this.records.length === 0) return;
       let monthRecords = [];
       let viewMonth = parseInt(moment(this.current_month, 'MMM YYYY').format('MM')) - 1;
       for (let record of this.records) {
           let recordMonth = new Date(record['date']).getMonth();
           if (recordMonth === viewMonth) monthRecords.push(record);
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
}