var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Clinical6Service } from '../../../clinical6.service';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type pre-populated.
 *
 * The value its the value retrieved from a Search Service,
 * in this case the value its not editable and its used for
 * information purposes..
 */
let StepInputPrePopulatedComponent = 
// TODO: Low priority input
class StepInputPrePopulatedComponent extends StepInputComponent {
    constructor(captiveReach) {
        super();
        this.captiveReach = captiveReach;
        /** @type {string} - The role. */
        this.roleValue = '';
        /** @type {boolean} - Flag indicating if the type of value its supported. */
        this.supported = true;
    }
    /** Angular lifecycle callback. */
    ngOnInit() {
        // even if there's no input, if there's a pre filled value
        // we send the valid form event
        // this.choiceChanged.emit(this.value);
        if (this.value) {
            if (this.subForm.controls['input'])
                this.subForm.controls['input'].setValue('true');
        }
    }
    /**
     * Converts the string value to a a camel case.
     *
     * @param s - The string to be formatted
     */
    snakeToCamel(s) {
        return s.replace(/_\w/g, function (m) { return m[1].toUpperCase(); });
    }
    /**
     * Converts the string value to a a title case.
     *
     * @param s - The string to be formatted
     */
    snakeToTitle(s) {
        if (!s)
            return '';
        let result = s.replace(/_\w/g, function (m) { return ' ' + m[1].toUpperCase(); });
        return result[0].toUpperCase() + result.slice(1);
    }
};
StepInputPrePopulatedComponent = __decorate([
    Component({
        selector: 'stepinput-pre-populated',
        template: `
    <ion-item class="field_container_compact" *ngIf="(style===InputStyle.attribute)">
      <ion-label class="label_container">
        <div class="label">{{label}}</div>
        <div class="value">{{value}}</div>
      </ion-label>
    </ion-item>

    <ion-item class="text-field" *ngIf="(style===InputStyle.roles)">
      <ion-label class="text-field-category" stacked>{{label}}</ion-label>
      <ion-label class="text-field-value">{{roleValue}}</ion-label>
    </ion-item>
  `
    })
    // TODO: Low priority input
    ,
    __metadata("design:paramtypes", [Clinical6Service])
], StepInputPrePopulatedComponent);
export { StepInputPrePopulatedComponent };

//# sourceMappingURL=stepinput-pre-populated.component.js.map
