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
import { Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';
import { analyticsService, discussService, Thread, Client } from 'clinical6';
import { AppConfig } from '../../config/app.config';
import { FlowService } from '../flow.service';
import { AlertModalPage } from '../../modal/alert-modal';
import { PdfViewPage } from '../../pages/pdf-view/pdf-view';
import { BasePage } from '../../pages/base/base-page';
import { UtilsService } from '../../utils.service';
let FlowStepPage = class FlowStepPage extends BasePage {
    constructor(utilsSvc, navParams, nav, flowCtlr, modalCtrl, sanitizer, platform, elementRef, alertCtrl) {
        super(platform, elementRef);
        this.utilsSvc = utilsSvc;
        this.navParams = navParams;
        this.nav = nav;
        this.flowCtlr = flowCtlr;
        this.modalCtrl = modalCtrl;
        this.sanitizer = sanitizer;
        this.platform = platform;
        this.elementRef = elementRef;
        this.alertCtrl = alertCtrl;
        this.isAnswerValid = false;
        this.footerPrevNext = false;
        this.showImage = false;
        this.isNavigating = false;
        this.fields = {};
        this.inputvalues = {};
        this.existingId = null;
        this.editing = true;
        this.comment = { present: false, body: null, custom: false };
        this.step = this.navParams.get('step');
        this.setupOrManage = this.isThisAManageStep() ? 'manage' : (this.navParams.get('setupOrManage') || 'setup');
        this.editing = (this.navParams.get('editing') !== undefined) ? this.navParams.get('editing') : ((this.setupOrManage === 'manage') ? false : true);
        this.navbarTitle = this.navParams.get('navbarTitle') || '';
        this.themeColor = this.navParams.get('themeColor') || '';
        this.backButtonText = this.navParams.get('backButtonText') || '';
        this.noDelete = this.navParams.get('noDelete') || undefined;
        this.previousResponse = this.navParams.get('previousResponse') || {};
        this.showImage = false;
        this.inputs = this.step.inputs;
        this.isAnswerValid = true;
        // Fill up the form with stored values
        for (let inputdata of this.step.inputs) {
            this.fields[inputdata.id] = this.step.get(inputdata.id) || '';
            this.inputvalues[inputdata.id] = this.step.get(inputdata.id);
            if (inputdata.question_type === 'pre_populated') {
                this.inputvalues[inputdata.id] = inputdata.style;
            }
            this.isAnswerValid = false;
        }
        for (let inputState of this.inputs) {
            inputState.inputId = inputState.id;
            inputState.inputTitle = inputState.title;
            inputState.inputStyle = inputState.style;
            inputState.inputChoices = inputState.choice_list;
            inputState.inputType = inputState.question_type;
            inputState.inputEnabled = !inputState.locked;
            inputState.inputRequired = inputState.required;
            for (let choiceState of inputState.inputChoices) {
                choiceState.choiceId = choiceState.id;
                choiceState.choiceBody = choiceState.body;
                choiceState.choiceSelected = false;
            }
        }
        if (this.step.progress_bar) {
            this.step.index = this.step.flow.steps.findIndex((step) => {
                return step.id === this.step.id;
            });
        }
        this.setButtonNames();
        this.footerPrevNext = this.isThisAPrevNextFooterPage();
        this.nextStep = this.selectNextStep();
        this.filter = { exclusionsList: this.navParams.get('exclusionsList') } || null;
    }
    /**
     * This method can be overridden to add additional/different button names
     * that help identifying the Prev-Next layout
     */
    setButtonNames() {
        this.nextButtonNames = ['next', 'continue'];
        this.prevButtonNames = ['prev'];
    }
    ngOnInit() {
    }
    /**
     * Returns the step to go to when clicking on "Next" button
     * Tipically a flow page can have many buttons and possible
     * corresponding next steps. In case of a Prev / Next footer page there
     * is no strict way to determine which one is the 'Prev' step and which the 'Next'.
     * This method can be overridden and it's used to determine the 'Next' step.
     * (The Prev step would presumably be a 'Back' button)
     */
    selectNextStep() {
        // if there is only one path, go for it
        if (this.step.paths.length === 1) {
            return this.step.paths[0];
        }
        // find one path whose button_name is in the this.nextButtonNames Array
        let nextStepIndex = this.step.paths.findIndex(path => { return this.nextButtonNames.map(value => { return path.button_name.toLowerCase() === value.toLowerCase(); }).reduce((prev, curr) => { return prev || curr; }); });
        if (nextStepIndex >= 0)
            return this.step.paths[nextStepIndex];
        return null;
    }
    isThisAPrevNextFooterPage() {
        let result = false;
        if (this.step.paths.length > 0) {
            // let nextStepIndex = this.step.paths.findIndex(path => ((path.button_name.toLowerCase() === 'next') || (path.button_name.toLowerCase() === 'continue' )));
            let nextStepIndex = this.step.paths.findIndex(path => { return this.nextButtonNames.map(value => { return path.button_name.toLowerCase() === value.toLowerCase(); }).reduce((prev, curr) => { return prev || curr; }); });
            let prevStepIndex = this.step.paths.findIndex(path => { return this.prevButtonNames.map(value => { return path.button_name.toLowerCase() === value.toLowerCase(); }).reduce((prev, curr) => { return prev || curr; }); });
            // Sets Button names
            this.prevButtonName = prevStepIndex >= 0 ? this.step.paths[prevStepIndex].button_name : '';
            this.nextButtonName = nextStepIndex >= 0 ? this.step.paths[nextStepIndex].button_name : '';
            // 1. Is there a button with a label in this.nextButtonNames ?
            if (nextStepIndex >= 0)
                result = true;
            else if (prevStepIndex >= 0)
                result = true;
            // 3. Is this a manage step ? (Legacy)
            if (this.setupOrManage === 'manage')
                result = true; // this is to keep proper handling of additional buttons
        }
        return result;
    }
    ionViewDidLoad() {
        this.checkComments();
    }
    checkComments() {
        return __awaiter(this, void 0, void 0, function* () {
            // check if there are comments for this step
            // this only applies for flow starting from the Manage Site Profile
            if (this.setupOrManage === 'manage' && !this.comment.custom) {
                // TODO, here we are checking every time, maybe we can condition the check if there is a pending alert
                const self = this;
                let commentable = this.step.commentable || this.step.flow.commentable;
                if (commentable) {
                    let thread = new Thread();
                    thread.owner = Client.instance.user;
                    thread.commentable = { id: commentable.commentable_id, type: commentable.commentable_type };
                    const comments = yield discussService.getComments(thread);
                    if (comments.length > 0) {
                        self.comment.present = true;
                        self.comment.body = comments[comments.length - 1].body;
                    }
                }
            }
        });
    }
    handleComment() {
        this.comment.present = false;
    }
    ionViewWillEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isNavigating = false;
            // Clinical6.postInsights('Step: this.step.title (id: ${this.step.id})', 'Entered: ' + this.step.title, true);
            if (this.step.id === this.step.flow.first.id) {
                yield analyticsService.postInsights('Flow: Started', 'Flow: ' + this.step.flow.name + ' (id: ' + this.step.flow.id + ')', true, this.step.flow.id, this.step.flow.name, (new Date()).toISOString());
                this.step.flow.transition('start');
                this.flowCtlr.resetStack(this.step);
            }
            yield analyticsService.postInsights('Flow Step: Entered', 'Flow: ' + this.step.flow.name + ' (id: ' + this.step.flow.id + ')', true, this.step.id, this.step.title, (new Date()).toISOString());
        });
    }
    goToPage(event) {
        switch (event.id) {
            case 'viewFile':
                // this is a dead ended flow
                this.nav.push(PdfViewPage, { title: '', filePath: event.value, themeColor: this.themeColor }, AppConfig.animationOpt);
                this.isNavigating = false;
                break;
            case 'removeFile':
                if (event.value) {
                    let input = this.step.inputs.find(el => { return (el.storage_attribute === 'remove_' + event.value); });
                    if (input) {
                        this.step.set(input.id, 'true');
                    }
                    else
                        console.error('FlowStep delete file: input ' + 'remove_' + event.value + ' not found in flow: ' + this.step.flow.id);
                }
                break;
            case 'uploadFile':
                var pathName = event.value;
                if (this.step.getPath(pathName) && this.step.getPath(pathName).steps &&
                    this.step.getNextStep(this.step.getPath(pathName).steps)) {
                    let followingStep = this.step.getNextStep(this.step.getPath(pathName).steps);
                    this.gotoFlow(pathName, { navbarTitle: followingStep.title, themeColor: this.themeColor, setupOrManage: 'setup' });
                }
                this.isNavigating = false;
                break;
        }
    }
    updateControlValue(event) {
        this.inputvalues[event.id] = event.value;
        this.step.set(event.id, event.value);
    }
    updateFormStatus(valid) {
        this.formValid = valid;
    }
    doneCallback() {
    }
    hasUploadButton() {
        return (this.step.paths.findIndex((el) => { return el.button_name === 'Attach Document via Email'; }) >= 0);
    }
    isThisAManageStep() {
        // When the Attach Document via Email sub_flows are used,
        // the info on setup/manage mode is lost since the flow has to be a 'setup' flow (showing next/prev buttons)
        // so here we infer whether this is going to be a 'manage' step looking at the button names.
        //
        // TODO: this is very baroque coding... need to figure out a way to set the step layout style in the flow
        // configuration on the backend
        if (!this.step)
            return false;
        return this.step.paths.reduce((prev, curr) => {
            return (prev ||
                ['medical_board',
                    'certificate',
                    'license',
                    'normal_values',
                    'cv',
                    'New Document',
                    'Done',
                    'document']
                    .indexOf(curr.button_name) >= 0) ||
                (curr.button_name && (curr.button_name.indexOf('tag_') > -1));
        }, false);
    }
    displayAsSpecialButton(path) {
        // Filter out some redundant or unneeded buttons/paths
        // that will break the page layout
        // in particular all buttons that are not to be displayed as
        // special buttons (ie. light blue wide buttons above the footer)
        // those include:
        //  - buttons to be placed in the footer (eg. )Next/Prev, etc..)
        //  - Buttons to be placed in the toolbar (eg. Plus, Done, ...)
        //  - buttons managed by some other component (eg. buttons related to file upload fields: medical_board, certificate, ...)
        //  - leftover/errored buttons (eg. with empty/null button_names )
        return !(([null,
            '',
            'medical_board',
            'certificate',
            'license',
            'normal_values',
            'cv',
            'document',
            'new document',
            'cancel',
            'plus',
            'prev',
            'next',
            'continue',
            'complete',
            'done']
            .indexOf(path.button_name.toLowerCase()) >= 0) ||
            (path.button_name && (path.button_name.indexOf('tag_') > -1)));
    }
    enterEditMode() {
        this.editing = true;
    }
    doneEditing() {
        if (this.setupOrManage === 'manage') {
            if ((this.step.flow.id)) {
                // here there is a proper Flow handling data input/update
                for (let inputdata of this.step.inputs) {
                    if (!AppConfig.demoMode) {
                        if (this.inputvalues[inputdata.id] !== null)
                            this.step.set(inputdata.id, this.inputvalues[inputdata.id]);
                    }
                }
                this.step.save();
                this.doneEditingCallback();
            }
            else {
                this.step.save();
                this.nav.pop(AppConfig.animationOptBack);
            }
        }
        else {
            this.nav.pop(AppConfig.animationOptBack);
        }
        this.editing = false;
    }
    doneEditingCallback() {
        // let nextPathName = this.step.getPath('Next').steps ? 'Next' : 'Complete';
        let nextPathName = this.selectNextStep() ? this.selectNextStep().button_name : null;
        let currentDepth = this.navParams.get('editingDepth') || 0;
        currentDepth++;
        if (!this.isThisASingleStep() && nextPathName) {
            // ... then keep following the flow
            this.gotoFlow(nextPathName, { setupOrManage: 'manage', noDelete: true, editing: true, editingDepth: currentDepth });
        }
        else {
            // ...otherwise just go back
            this.nav.remove(this.nav.length() - currentDepth, currentDepth);
        }
    }
    isThisASingleStep() {
        // A step is considered to be a single step
        // if the next step in the flow has a different title
        // let nextPathName = this.step.getPath('Next').steps ? 'Next' : 'Complete';
        let nextPath = this.selectNextStep();
        // if (this.step.getPath(nextPathName) &&
        //     this.step.getPath(nextPathName).steps &&
        //     this.step.getNextStep(this.step.getPath(nextPathName).steps) &&
        //     (this.step.getNextStep(this.step.getPath(nextPathName).steps).title === this.step.title )) {
        if (nextPath &&
            nextPath.steps &&
            this.step.getNextStep(nextPath.steps) &&
            (this.step.getNextStep(nextPath.steps).title === this.step.title)) {
            return false; // this step is to be considered as part of a pool
        }
        else {
            return true; // this step is to be considered as single
        }
    }
    getDoneEditLabel() {
        if ((this.setupOrManage === 'manage') && this.editing)
            return (this.isThisASingleStep() ? 'Done' : 'Next');
        if ((this.setupOrManage === 'manage') && !this.editing)
            return 'Edit';
    }
    actionDoneEdit() {
        if ((this.setupOrManage === 'manage') && this.editing)
            return this.doneEditing();
        if ((this.setupOrManage === 'manage') && !this.editing)
            return this.enterEditMode();
    }
    isActionBtnDisabled() {
        if ((this.setupOrManage === 'manage') && this.editing)
            return (!this.formValid);
        return false;
    }
    getRelatedConditionalSteps(nextPathName) {
        if (!(this.step.getPath(nextPathName) &&
            this.step.getPath(nextPathName).steps &&
            this.step.getNextStep(this.step.getPath(nextPathName).steps)))
            return null;
        let condSteps = this.step.getPath(nextPathName).steps;
        let nextStep = this.step.getNextStep(this.step.getPath(nextPathName).steps);
        return condSteps.map(el => { return el.step; })
            .filter((el) => el.id !== nextStep.id);
    }
    gotoFlowLegacy(name, options = {}) {
        let dataValues;
        let previousResponse = this.previousResponse;
        this.step.onSave = (currentResponse) => {
            previousResponse = currentResponse;
        };
        // This is used to prevent double tapping / double saving / data corruption.
        // Do not remove this when something fails, instead figure out where "isNavigating"
        // should be true/false appropriately.
        if (!this.isNavigating) {
            this.isNavigating = true;
            let followingStep;
            // handling inputs
            for (let inputdata of this.step.inputs) {
                if (!AppConfig.demoMode) {
                    this.step.existingId = this.existingId;
                    this.step.set(inputdata.id, this.inputvalues[inputdata.id]);
                }
            }
            // SKIP in case of Demo Mode or Force ignoring required fields
            if (!AppConfig.demoMode && !options.ignoreRequiredFields) {
                const self = this;
                let auxStep = this.step;
                this.step.go(name).then((followingStep) => {
                    if (followingStep) {
                        for (let index = 0; index < followingStep.inputs.length; index++) {
                            let singleInput = followingStep.inputs[index];
                            // if we need values for the next step, we save them
                            if (dataValues) {
                                if (dataValues[index]) {
                                    followingStep.set(singleInput.id, dataValues[index].value);
                                }
                                else {
                                    // if there are no values, we clear previous values
                                    followingStep.set(singleInput.id, undefined);
                                }
                            }
                        }
                        this.flowCtlr.goToStep(followingStep, Object.assign({
                            step: followingStep,
                            navbarTitle: self.navbarTitle,
                            themeColor: self.themeColor,
                            backButtonText: self.backButtonText,
                            previousResponse,
                            setupOrManage: this.setupOrManage
                        }, options));
                        this.isNavigating = false;
                    }
                }, (failure) => {
                    this.isNavigating = false;
                    AlertModalPage.show(self, {
                        type: 'type_error',
                        body: failure.messageHTML || failure.message,
                        subTitle: 'Unable to save',
                        cancelCallback: (ref) => {
                            console.log('Could not load the dashaboard', failure);
                        }
                    });
                });
            }
            else {
                if (this.step.getPath(name).steps.length > 0) {
                    followingStep = this.step.getPath(name).steps[0].step;
                    if (followingStep) {
                        this.flowCtlr.goToStep(followingStep, {
                            step: followingStep,
                            navbarTitle: this.navbarTitle,
                            themeColor: this.themeColor,
                            backButtonText: this.backButtonText,
                            setupOrManage: this.setupOrManage
                        });
                        this.isNavigating = false;
                    }
                }
                else {
                    this.step.flow.end(this.step);
                }
            }
        }
    }
    gotoFlow(name, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // This is used to prevent double tapping / double saving / data corruption.
            // Do not remove this when something fails, instead figure out where "isNavigating"
            // should be true/false appropriately.
            if (!this.isNavigating) {
                this.isNavigating = true;
                let dataValues;
                let previousResponse = this.previousResponse;
                this.step.onSave = (currentResponse) => {
                    previousResponse = currentResponse;
                };
                // handling inputs
                for (let inputdata of this.step.inputs) {
                    if (!AppConfig.demoMode) {
                        this.step.existingId = this.existingId;
                        this.step.set(inputdata.id, this.inputvalues[inputdata.id]);
                        console.log('Flow proces Values');
                        console.log(`InputId: ${inputdata.id}, Value: ${this.inputvalues[inputdata.id]}`);
                    }
                }
                // console.log('FlowStep Page getting the followingStep for ', this.step);
                let followingStep;
                // Handle the special cases:
                // - Demo Mode, or
                // - Force ignoring required fields
                if (AppConfig.demoMode || options.ignoreRequiredFields) {
                    followingStep = this.step.getPath(name).steps[0].step;
                    // last step
                    if (!followingStep) {
                        this.step.flow.end(this.step);
                        // this.isNavigating = false;
                        return true;
                    }
                }
                else {
                    try {
                        followingStep = yield this.step.go(name);
                    }
                    catch (failure) {
                        console.warn('FlowStep Page this.step.go(name), failure', failure);
                        AlertModalPage.show(this, {
                            type: 'type_error',
                            body: failure.messageHTML || failure.message,
                            subTitle: 'Unable to save',
                            cancelCallback: (ref) => {
                                console.log('Could not load the dashaboard', failure);
                            }
                        });
                        this.isNavigating = false;
                        return false;
                    }
                }
                if (!followingStep) {
                    // this.isNavigating = false;
                    return true;
                }
                // console.log('FlowStep Page followingStep is ', followingStep);
                // double check NEED REVIEW
                for (let index = 0; index < followingStep.inputs.length; index++) {
                    let singleInput = followingStep.inputs[index];
                    // if we need values for the next step, we save them
                    if (dataValues) {
                        if (dataValues[index]) {
                            followingStep.set(singleInput.id, dataValues[index].value);
                        }
                        else {
                            // if there are no values, we clear previous values
                            followingStep.set(singleInput.id, undefined);
                        }
                    }
                }
                this.isNavigating = false;
                return this.flowCtlr.goToStep(followingStep, Object.assign({
                    step: followingStep,
                    navbarTitle: this.navbarTitle,
                    themeColor: this.themeColor,
                    backButtonText: this.backButtonText,
                    previousResponse,
                    setupOrManage: this.setupOrManage
                }, options));
            }
        });
    }
    showPrevButton() {
        return (this.step.index !== 0);
    }
    imgLoaded() {
        this.showImage = true;
    }
    imgError(event) {
        console.log('image error called ', event);
        this.showImage = false;
    }
    trustHTML(text) {
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    onError(message) {
    }
    showError(subtitle, body) {
        AlertModalPage.show(this, {
            type: 'type_error',
            body: body,
            subTitle: subtitle
        });
    }
    deleteItem(id) {
        const self = this;
        let prompt = this.alertCtrl.create({
            title: 'Delete Item',
            message: 'Are you sure you would like to delete this item?',
            inputs: [],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                        console.log('Deleting, Cancel clicked, returns to the same page');
                    }
                },
                {
                    text: 'Delete',
                    handler: data => {
                        console.log('This needs to be handled by application');
                    }
                }
            ]
        });
        prompt.present();
    }
    /**
     * This is to Handle the 'Go' button on the device Keyboard for iOS
     * @param event
     */
    handleGoButton(event) {
        if (this.platform && this.platform.is('ios')) {
            if (event.keyCode === 13) {
                for (let i = 0; i < this.inputItems.length; i++) {
                    if (this.inputItems[i] === document.activeElement) {
                        console.log('found item, index: ', i);
                        if (i >= this.inputItems.length - 2) {
                            let nextPathName = 'Complete';
                            if (this.step.getPath('Next').steps)
                                nextPathName = 'Next';
                            if (this.step.getPath('NEXT').steps)
                                nextPathName = 'NEXT';
                            if (this.step.getPath('next').steps)
                                nextPathName = 'next';
                            this.gotoFlow(nextPathName);
                        }
                        else {
                            let auxItem = this.inputItems[(i + 2) % this.inputItems.length];
                            auxItem.focus();
                        }
                        break;
                    }
                }
            }
        }
    }
    goBack() {
        this.popStack();
        this.flowCtlr._navCtrl.pop(AppConfig.animationOptBack);
    }
    popStack() {
        this.flowCtlr._stepsStack.pop();
        if (this.flowCtlr._stepsStack.length - 1 > 0) {
            // update the current progress bar index in the FlowService
            if (this.step['progress_bar'] && this.flowCtlr._progress_current_step > 0)
                this.flowCtlr._progress_current_step--;
            this.flowCtlr._currentStepID = this.flowCtlr._stepsStack[this.flowCtlr._stepsStack.length - 1].stepId;
        }
        else {
            // update the current progress bar index in the FlowService
            if (this.step['progress_bar'] && this.flowCtlr._progress_current_step > 0)
                this.flowCtlr._progress_current_step--;
            this.flowCtlr._currentStepID = undefined;
        }
    }
    getIndexByBFS() {
        if (this.step.progress_bar) {
            const sourceBFS = this.step.flow.getBFS(this.step.flow.first);
            this.step.flow.total = Math.max.apply(Math, Object.keys(sourceBFS).map(key => sourceBFS[key]));
            this.step.index = this.step.id === this.step.flow.first.id ? 0 : sourceBFS[this.step.id] - 1;
        }
    }
};
FlowStepPage = __decorate([
    Component({
        selector: 'flowstep',
        template: `
    <ion-header>
      <app-toolbar [title]="navbarTitle" [backLabel]="backButtonText" [bgColor]="themeColor" layout="plain-action" [rightLabel]="getDoneEditLabel()"
        (actionClick)="actionDoneEdit()" [actionDisabled]="isActionBtnDisabled()" (backClick)="popStack()"></app-toolbar>
    </ion-header>

    <ion-content no-padding (click)="return;">

      <button ion-button no-lines no-margin block no-padding clear class="alert-ribbon red-alert" *ngIf="comment.present" (click)="handleComment()">
        <span class="app-p6-icon-bell bell-icon"></span><div>{{comment.body}}</div>
      </button>

      <div class="heading-container">
        <div class="progress-bar" *ngIf="step.progress_bar">
          <div class="back"></div>
          <div class="swipe" [style.width]="((step.index+1) / step.flow.total * 100) + '%'" [style.border-radius]="(step.index+1) == step.flow.total?'100px 100px 100px 100px':'100px 0px 0px 100px'"></div>
        </div>
        <div class="no-progress-bar-spacer" *ngIf="!step.progress_bar"></div>
        <div class="title" [innerHTML]="step.title" *ngIf="step.title"></div>
        <img class="icon-image" src="{{step.image.original}}" [style.display]="(showImage?'':'none')" (error)="imgError($event)"
          (load)="imgLoaded()" />
      </div>

      <div class="helper" [innerHTML]="trustHTML(step.rich_description)" *ngIf="step.rich_description"></div>
      <div class="helper" [innerHTML]="trustHTML(step.description)" *ngIf="!step.rich_description && step.description"></div>

      <ion-col class="input-container" no-margin>
        <input-container [inputList]="inputs" [fields]="fields" [filter]="filter" [readonly]="!editing" (formValueChanged)="updateControlValue($event)"
          (formStatusChanged)="updateFormStatus($event)" (keyup)="handleGoButton($event)" (goToPage)="goToPage($event)"></input-container>
      </ion-col>

      <!-- Display of Additional Special Buttons -->
      <ion-list no-margin class="additional-buttons">
        <ng-template ngFor let-path [ngForOf]="step.paths">
          <ion-row no-margin no-padding *ngIf="displayAsSpecialButton(path)">
            <button ion-button (click)="gotoFlow(path.button_name)" [disabled]="!formValid">{{path.button_name}}</button>
          </ion-row>
        </ng-template>
      </ion-list>
      <div class="footer-spacer" *ngIf="(setupOrManage === 'manage')"></div>
    </ion-content>

    <!-- Footer With Prev and Next/Complete buttons -->
    <ion-footer class="survey-page" *ngIf="footerPrevNext && (setupOrManage == 'setup')">
      <ion-toolbar no-padding>
        <button ion-button class="button-left theme-primary-color" [style.background-color]="themeColor" *ngIf="showPrevButton()"
          (click)="goBack()">Prev
        </button>
        <!-- change !formValid with !isAnswerValid to disable validations-->
        <button [disabled]="!formValid || hasUploadButton()" ion-button class="button-right theme-primary-color" [style.background-color]="themeColor"
          (click)="gotoFlow(nextStep.button_name)">{{nextStep.button_name}}
        </button>
      </ion-toolbar>
    </ion-footer>

    <!-- Other Buttons to be displayed in the footer (are there any?) -->
    <ion-footer *ngIf="((!footerPrevNext)  && (setupOrManage == 'setup'))" no-border>
      <ion-toolbar class="footer">
        <ion-row class="footer-buttons">
          <ion-col *ngFor='let next of step.paths'>
            <button class="theme-primary-color" [style.background-color]="themeColor" ion-button full (click)="gotoFlow(next.button_name)"
              *ngIf="!displayAsSpecialButton(next)" [disabled]="!formValid">{{ next.button_name }}</button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>

    <!-- Delete Button in case of Editing Page-->
    <ion-footer no-padding no-border no-margin *ngIf="(setupOrManage === 'manage') && editing && !noDelete">
      <ion-toolbar class="footer delete-button">
        <button class="delete-button" ion-button full color="danger" outline (click)="deleteItem()">Delete</button>
      </ion-toolbar>
    </ion-footer>
  `
    }),
    __metadata("design:paramtypes", [UtilsService,
        NavParams,
        NavController,
        FlowService,
        ModalController,
        DomSanitizer,
        Platform,
        ElementRef,
        AlertController])
], FlowStepPage);
export { FlowStepPage };

//# sourceMappingURL=flowstep.js.map
