import { EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
export declare class CalendarComponent {
    legend: boolean;
    events: CalendarEvent[];
    records: any;
    onEvent: EventEmitter<any>;
    today: any;
    current_month: string;
    constructor();
    navigate(dateView: any): void;
    eventAction(dayData: any): void;
    colorDayNumbers(): void;
}
