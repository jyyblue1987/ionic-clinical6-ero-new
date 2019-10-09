import { User, Flow, Entry } from 'clinical6';
export declare class EdiaryIonicService {
    profile: any;
    mobileUser: User;
    flows: {};
    constructor();
    getMobileUser(): Promise<User>;
    getEntries(permalink?: string, date?: string): Promise<Entry | Entry[]>;
    getEntryGroups(): Promise<any>;
    getEntryGroupId(permalink: any): Promise<any>;
    getEntryGroup(permalink: string): Promise<any>;
    getFlowFromEntry(entry: any): Promise<any>;
    getFlow(permalink: string): Promise<any>;
    addRecord(permalink: string, flow: Flow, entryDate: string, templateId?: number): Promise<any>;
    updateEntry(entry: any, flow: any, flow_response: any): Promise<any>;
    addEntry(permalink: string, entryDate: string, templateId?: number): Promise<Entry | Entry[]>;
    removeEntry(entry: any): Promise<void>;
    saveEntry(entry: any): Promise<void>;
}
