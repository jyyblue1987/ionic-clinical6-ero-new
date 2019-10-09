import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class TutorialService {

  private _tutorial = {};

  tour_number = '';
  didSwitch: boolean;
  video_url;
  showVideo = false;
  callBack: () => {};
  callBackRef;

  constructor(
    public _sanitizer: DomSanitizer
  ) {}

  localStorageKey(id: any) {
    return 'Tutorial_' + id.toString();
  }
  getTutorialVisibility(id: any) {
      if (this._tutorial[id] === undefined) {
        if (localStorage.getItem(this.localStorageKey(id))) {
          this._tutorial[id] = (localStorage.getItem(this.localStorageKey(id)) === 'enabled') ? true : false;
          return this._tutorial[id];
        }
        else { // first time
          this._tutorial[id] = true;
        }
      }
      return this._tutorial[id];
  }

  hideTutorial(id: any) {
    this._tutorial[id] = false;
    return true;
  }

  disableTutorial (id: any) {
    this.hideTutorial(id);
    localStorage.setItem(this.localStorageKey(id), 'disabled');
  }

  playVideo(callBack: any, callBackRef: any) {
    this.callBack = callBack;
    this.callBackRef = callBackRef;
    this.showVideo = true;
  }

  closeVideo(callBack: any) {
    this.showVideo = false;
    if (this.callBack) this.callBack.apply(this.callBackRef);
  }

  setVideo(url: string) {
    this.video_url = this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  changeTargetId (currentView: any, oldElem: any, newId: any) {
    let target = document.querySelector(currentView);
    target.querySelector(oldElem).id = newId.replace(/[#|.| ]/gi, '');
    return newId;
  }

  clear() {
    this._tutorial = {};
  }

}

// example video url
// 'https://www.youtube.com/embed/OU-cIoqKw-0?rel=0&controls=1&showinfo=0&autoplay=1&start=2'; // Invite SC video tutorial
// 'https://www.youtube.com/embed/Ai3nY8AQtu0?rel=0&controls=1&showinfo=0&autoplay=1&start=8'; // Site Address video tutorial
// 'https://www.youtube.com/embed/Nm6p82zAuZY?rel=0&controls=1&showinfo=0&autoplay=1&start=7'; // Site Staff video tutorial
// 'https://www.youtube.com/embed/hR9C2gBXCFE?rel=0&controls=1&showinfo=0&autoplay=1&start=16'; // Main Dashboard video tutorial
// 'https://www.youtube.com/embed/BjnU7qQyc7Q?rel=0&controls=1&showinfo=0&autoplay=1&start=14'; // Study Dashboard video tutorial
// 'https://www.youtube.com/embed/z8nS60AktcA?rel=0&controls=1&showinfo=0&autoplay=1&start=14'; // CTA video tutorial 
// 'https://www.youtube.com/embed/q1ZjEzNTDMk?rel=0&controls=1&showinfo=0&autoplay=1&start=10'; // Trial Team video tutorial
// 'https://www.youtube.com/embed/BcJAzRKOHmE?rel=0&controls=1&showinfo=0&autoplay=1'; // Study Address video tutorial