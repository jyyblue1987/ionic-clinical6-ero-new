import { Observable } from 'rxjs';
export declare class SoftKeyboardService {
    keyboardOpen: boolean;
    keyboardObservable: Observable<any>;
    constructor();
    dispatchShow(e: any): void;
    dispatchHide(e: any): void;
}
