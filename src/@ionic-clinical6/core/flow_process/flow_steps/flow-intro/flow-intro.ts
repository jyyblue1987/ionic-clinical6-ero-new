/* globals Clinical6 */
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AppConfig } from '../../../config/app.config';
import { DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import { FlowService } from '../../flow.service';
import { Flows } from '../../flow-factory';
import { FlowStepPage } from '../flowstep';
import { UtilsService } from '../../../utils.service';

@Component({
    selector: 'flow-intro',
    templateUrl: 'flow-intro.html'
})
export class FlowIntroPage extends FlowStepPage {

    flow: any;
    step: any;
    navbarTitle: string;
    actionLabel: string;
    videoUrl: SafeResourceUrl;
    previewImgUrl: SafeResourceUrl;

    constructor(  public utilsSvc: UtilsService,
                  public navParams: NavParams,
                  public nav: NavController,
                  public flowCtlr: FlowService,
                  public modalCtrl: ModalController,
                  private renderer: Renderer,
                  private _sanitizer: DomSanitizer) {
        super(utilsSvc, navParams, nav, flowCtlr, modalCtrl);

        this.step = this.navParams.get('step');
        this.navbarTitle = this.navParams.get('navbarTitle') || 'PPD';
        this.actionLabel = this.step.paths[0].button_name; // takes the first button item
        this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.step.video_link);
        this.previewImgUrl = this._sanitizer.bypassSecurityTrustStyle('url(' + this.step.image.original + ')');
    }
    get iframeUrl() {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.step.video_link);
    }
    get richText() {
        return this._sanitizer.bypassSecurityTrustHtml(this.step.rich_description);
    }
    doBegin() {

        this.step.go(this.actionLabel).then((nextStep) => {
            this.nav.push( Flows.Factory(nextStep),
                        { step: nextStep,  navbarTitle: this.navbarTitle, backButtonText: 'Home'}, AppConfig.animationOpt);
        });

    }
    playVideo() { /*
        this.video_url = undefined;
        this.step.iframe_url = "https://www.youtube.com/embed/rX-hDqHoR50?rel=0&controls=0&showinfo=0&autoplay=1";
        // this.step.iframe_url = "https://www.youtube.com/embed/8KkKuTCFvzI?rel=0&controls=0&showinfo=0&autoplay=1";
        this.video_url = this._sanitizer.bypassSecurityTrustResourceUrl(this.step.iframe_url);
        this.showVideo = true;

        let event = new MouseEvent('click', {});
        this.renderer.invokeElementMethod(this.iframeArea.nativeElement, 'dispatchEvent', [event]);
        */
    }
}