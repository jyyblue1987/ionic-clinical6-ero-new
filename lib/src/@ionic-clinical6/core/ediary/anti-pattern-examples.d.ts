import { Flow } from 'clinical6';
import { EdiaryIonicService } from './ediary.service';
export declare class EdiaryIonicServiceAP extends EdiaryIonicService {
    entryGroups: any;
    constructor();
    getEntryGroupId(permalink: any): any;
    getEntryGroup(permalink: string): any;
    getEntriesAP(permalink?: string, date?: string): Promise<any>;
    getEntryGroupsAP(): Promise<any>;
    getFlowAP(permalink: string): Promise<Flow>;
    addRecordAP(permalink: string, flow: Flow, entryDate: string, templateId?: number): Promise<any>;
    addEntryAP(permalink: string, entryDate: string, templateId?: number): Promise<any>;
}
