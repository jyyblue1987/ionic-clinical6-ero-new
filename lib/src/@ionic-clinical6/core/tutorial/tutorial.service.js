var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
let TutorialService = class TutorialService {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this._tutorial = {};
        this.tour_number = '';
        this.showVideo = false;
    }
    localStorageKey(id) {
        return 'Tutorial_' + id.toString();
    }
    getTutorialVisibility(id) {
        if (this._tutorial[id] === undefined) {
            if (localStorage.getItem(this.localStorageKey(id))) {
                this._tutorial[id] = (localStorage.getItem(this.localStorageKey(id)) === 'enabled') ? true : false;
                return this._tutorial[id];
            }
            else {
                this._tutorial[id] = true;
            }
        }
        return this._tutorial[id];
    }
    hideTutorial(id) {
        this._tutorial[id] = false;
        return true;
    }
    disableTutorial(id) {
        this.hideTutorial(id);
        localStorage.setItem(this.localStorageKey(id), 'disabled');
    }
    playVideo(callBack, callBackRef) {
        this.callBack = callBack;
        this.callBackRef = callBackRef;
        this.showVideo = true;
    }
    closeVideo(callBack) {
        this.showVideo = false;
        if (this.callBack)
            this.callBack.apply(this.callBackRef);
    }
    setVideo(url) {
        this.video_url = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    changeTargetId(currentView, oldElem, newId) {
        let target = document.querySelector(currentView);
        target.querySelector(oldElem).id = newId.replace(/[#|.| ]/gi, '');
        return newId;
    }
    clear() {
        this._tutorial = {};
    }
};
TutorialService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DomSanitizer])
], TutorialService);
export { TutorialService };
// example video url
// 'https://www.youtube.com/embed/OU-cIoqKw-0?rel=0&controls=1&showinfo=0&autoplay=1&start=2'; // Invite SC video tutorial
// 'https://www.youtube.com/embed/Ai3nY8AQtu0?rel=0&controls=1&showinfo=0&autoplay=1&start=8'; // Site Address video tutorial
// 'https://www.youtube.com/embed/Nm6p82zAuZY?rel=0&controls=1&showinfo=0&autoplay=1&start=7'; // Site Staff video tutorial
// 'https://www.youtube.com/embed/hR9C2gBXCFE?rel=0&controls=1&showinfo=0&autoplay=1&start=16'; // Main Dashboard video tutorial
// 'https://www.youtube.com/embed/BjnU7qQyc7Q?rel=0&controls=1&showinfo=0&autoplay=1&start=14'; // Study Dashboard video tutorial
// 'https://www.youtube.com/embed/z8nS60AktcA?rel=0&controls=1&showinfo=0&autoplay=1&start=14'; // CTA video tutorial 
// 'https://www.youtube.com/embed/q1ZjEzNTDMk?rel=0&controls=1&showinfo=0&autoplay=1&start=10'; // Trial Team video tutorial
// 'https://www.youtube.com/embed/BcJAzRKOHmE?rel=0&controls=1&showinfo=0&autoplay=1'; // Study Address video tutorial 

//# sourceMappingURL=tutorial.service.js.map
