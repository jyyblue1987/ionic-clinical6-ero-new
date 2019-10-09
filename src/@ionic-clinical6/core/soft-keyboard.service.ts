import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SoftKeyboardService {

  keyboardOpen: boolean;
  keyboardObservable: Observable<any>;

  constructor() {
    this.keyboardOpen = false;

    window.addEventListener('native.keyboardshow', this.dispatchShow);
    window.addEventListener('native.keyboardhide', this.dispatchHide);
    this.keyboardObservable = Observable.fromEvent(document, 'softKeyboardEvent');
    this.keyboardObservable.subscribe( (data) => {
      if (data.closed)
        this.keyboardOpen = false;
      else
        this.keyboardOpen = true;
    });
  }

  dispatchShow(e: any) {
      var event = new CustomEvent('softKeyboardEvent');
      event['keyboardHeight'] = e.keyboardHeight;
      document.dispatchEvent(event);
  }

  dispatchHide(e: any) {
      var event = new CustomEvent('softKeyboardEvent');
      event['closed'] = true;
      document.dispatchEvent(event);
  }


}