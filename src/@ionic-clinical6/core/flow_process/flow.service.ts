import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { NavController } from 'ionic-angular';
import { FlowStep } from 'clinical6';

import { Flows } from './flow-factory';

@Injectable()
export class FlowService {

  _navCtrl: NavController;
  _stepsStack: Array<{ navIndex: number, stepId: number }> = [];
  _currentStepID: number;
  _currentFlowID: number;

  // The following helps handling the progress bar
  // the flow step page is responsible to manage their values
  _progress_total_steps: number;
  _progress_current_step: number;

  constructor() {
      console.log('flowstep service');
  }

  setNav(nav: NavController) {
    this._navCtrl = nav;
  }

   goToStep(step: FlowStep, options: any) {
    // update the current progress bar index
    if (step['progress_bar'] && this._progress_current_step < this._progress_total_steps)
      this._progress_current_step++;
    // Resets current steps stack and flow in case of new flow.
    if (step.flow.id !== this._currentFlowID) this.resetStack(step);

    // look for circular references
    let existingIdx = this._stepsStack.findIndex( el => { return (el.stepId === step.id); });

    // Push OR remove
    if (existingIdx >= 0) {
      // console.log('goToStep removing and existing step ', step);
      this._navCtrl.remove(this._stepsStack[existingIdx].navIndex + 1, this._navCtrl.length() - (this._stepsStack[existingIdx].navIndex + 1), AppConfig.animationOpt );
      this._stepsStack.splice(existingIdx + 1, this._stepsStack.length - (existingIdx + 1));
    }
    else {
      // console.log('goToStep going to the following step ', step);
      this._stepsStack.push({navIndex: this._navCtrl.length(), stepId: step.id});
      this._navCtrl.push( Flows.Factory(step), options, AppConfig.animationOpt );
    }

    // // remove unneeded steps=
    // if (existingIdx >= 0) {
    //   nav.remove(this._stepsStack[existingIdx].navIndex + 1, nav.length() - (this._stepsStack[existingIdx].navIndex + 1) );
    //   this._stepsStack.splice(existingIdx + 1, this._stepsStack.length - (existingIdx + 1));
    // }
    // else {
    //   this._stepsStack.push({navIndex: nav.length(), stepId: step.id});
    //   nav.push( Flows.Factory(step.content_type, step), options );
    // }
  }
  resetStack(step?: FlowStep) {
    this._stepsStack.splice(0, this._stepsStack.length);
    this._stepsStack.length = 0;
    if (step) {
      this._currentFlowID = step.flow.id;
      this._currentStepID = step.id;
    }
  }

  // helper method to prepare the progress bar
  setProgressBar(step: FlowStep) {
    if (step && step.flow.steps) {
      this._progress_total_steps = step.flow.steps.reduce( (total, el) => el['progress_bar'] ? total + 1 : total, 0);
      this._progress_current_step = 0;
    }
  }

}