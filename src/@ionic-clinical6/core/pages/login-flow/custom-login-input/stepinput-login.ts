import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FormGroup } from '@angular/forms';
import { StepInputTextComponent } from '../../../flow_process/flow_inputs/text/stepinput-text.component';
// import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'custom-stepinput-login',
  templateUrl: './stepinput-login.html'
})

export class CustomStepInputLoginComponent extends StepInputTextComponent {

    step: any;
    link_button: any;
    constructor(public navParams: NavParams,
                public platform: Platform,
                public elementRef: ElementRef,
                public _keyboard: Keyboard
                                            ) {
    super();
    this.step = this.navParams.data && this.navParams.data.step ? this.navParams.data.step : null;
  }

  /** Angular lifecycle callback to calculate the displayFormat, the pickerFormat, the minDate and the maxDate to use in the ion-datetime picker */
  ngOnInit() {
    super.ngOnInit();
    this._keyboard.hideKeyboardAccessoryBar(false);
    this.readOnly && (this.focusOut = this.readOnly);
    let attribute = this.flowInput['attribute'];
    if (attribute && attribute['link_button']) {
      this.link_button = this.linkButton;
    }
  }

  btnClicked(ev: UIEvent) {
    this.goToPage.emit({id: this.flowInput.inputId, value: this.link_button});
  }

  get linkButton() {
    let button;
    if (this.step.paths && this.step.paths.length > 0) {
      button = this.step.paths.filter(btn => (btn.button_name == this.flowInput['attribute']['link_button'] && btn.is_link_button));
    }
    return button && button[0];
  }
  
}