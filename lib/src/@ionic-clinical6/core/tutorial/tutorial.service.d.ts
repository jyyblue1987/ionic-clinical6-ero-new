import { DomSanitizer } from '@angular/platform-browser';
export declare class TutorialService {
    _sanitizer: DomSanitizer;
    private _tutorial;
    tour_number: string;
    didSwitch: boolean;
    video_url: any;
    showVideo: boolean;
    callBack: () => {};
    callBackRef: any;
    constructor(_sanitizer: DomSanitizer);
    localStorageKey(id: any): string;
    getTutorialVisibility(id: any): any;
    hideTutorial(id: any): boolean;
    disableTutorial(id: any): void;
    playVideo(callBack: any, callBackRef: any): void;
    closeVideo(callBack: any): void;
    setVideo(url: string): void;
    changeTargetId(currentView: any, oldElem: any, newId: any): any;
    clear(): void;
}
