import { NavParams } from 'ionic-angular';
import { StepInputComponent } from '../stepinput.component';
/**
 * This class represents an input of type single choice.
 *
 * The value its the choice selected by the user.
 */
export declare class StepInputSingleChoiceComponent extends StepInputComponent {
    navParams: NavParams;
    /**
     * @type {string} - A color used to paint the radio buttons,
     * in accordance to a define app theme color.
     */
    themeColor: string;
    step: any;
    constructor(navParams: NavParams);
    ngOnInit(): void;
    select(data: any): void;
    fixStateInput(): void;
}
