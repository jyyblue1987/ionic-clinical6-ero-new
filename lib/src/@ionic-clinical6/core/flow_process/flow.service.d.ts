import { NavController } from 'ionic-angular';
import { FlowStep } from 'clinical6';
export declare class FlowService {
    _navCtrl: NavController;
    _stepsStack: Array<{
        navIndex: number;
        stepId: number;
    }>;
    _currentStepID: number;
    _currentFlowID: number;
    _progress_total_steps: number;
    _progress_current_step: number;
    constructor();
    setNav(nav: NavController): void;
    goToStep(step: FlowStep, options: any): void;
    resetStack(step?: FlowStep): void;
    setProgressBar(step: FlowStep): void;
}
