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
import { Injectable } from '@angular/core';
import { clinical6, flowService, eDiaryService, Client, Entry, StorageUtility } from 'clinical6';
import * as moment from 'moment';
import { isArray } from 'ionic-angular/util/util';
let EdiaryIonicService = class EdiaryIonicService {
    constructor() {
        // entryGroups;
        // ventilatorFlow: Flow;
        this.flows = {};
    }
    getMobileUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return clinical6.user;
        });
    }
    getEntries(permalink, date) {
        return __awaiter(this, void 0, void 0, function* () {
            let mobileUser = clinical6.user;
            // set the filter
            let filter = {};
            if (permalink)
                filter['entry_group_id'] = yield this.getEntryGroupId(permalink);
            if (date)
                filter['date'] = date;
            // mobileUserService.getEntries(mobileUser, null, 'networkFirst') // alternative
            return yield mobileUser.getEntries(filter, 'networkFirst');
            // return mobileUser.getEntries(filter, 'cacheFirst');
        });
    }
    // getEntryGroupsOrig() {
    //   if (this.entryGroups) {
    //     return new Promise<any> ( resolve => resolve(this.entryGroups) )
    //   }
    //   else {
    //     const self = this;
    //     return  eDiaryService.get('networkFirst') // should be cacheFirst
    //       .then( entryGroups => {
    //         console.log('EdiaryIonicService getEntryGroups', entryGroups);
    //         self.entryGroups = entryGroups;
    //         return entryGroups;
    //       })
    //   }
    // }
    getEntryGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const storageUtility = StorageUtility.instance;
            const entryGroups = yield storageUtility.get('ediary__entry_groups', { asArray: true });
            // console.log('EdiaryIonicService getEntryGroups cache', entryGroups);
            if (entryGroups.length > 0)
                return entryGroups;
            else {
                console.log('getEntryGroups new', entryGroups);
                const _entryGroups = yield eDiaryService.get('networkFirst');
                // console.log('EdiaryIonicService getEntryGroups network', entryGroups);
                // self.entryGroups = entryGroups;
                return _entryGroups;
            }
        });
    }
    getEntryGroupId(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = null;
            const entryGroups = yield this.getEntryGroups();
            if (entryGroups && isArray(entryGroups)) {
                let entry = entryGroups.find(entry => entry.permanentLink === permalink);
                if (entry)
                    id = entry.id;
            }
            return id;
        });
    }
    getEntryGroup(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            let entryGroup = null;
            const entryGroups = yield this.getEntryGroups();
            if (entryGroups) {
                entryGroup = entryGroups.find(entry => entry.permanentLink === permalink);
            }
            return entryGroup;
        });
    }
    getFlowFromEntry(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return entry.template.flow_process;
        });
    }
    getFlow(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            let localFlow = this.flows[permalink];
            if (localFlow) {
                localFlow.reset();
                return localFlow;
            }
            const self = this;
            const flow = yield flowService.getFlow(permalink);
            // set the capture of all the paths to false except the last one
            // ... in case the flow is not properly set from the platform
            for (let step of flow.steps)
                for (let path of step['paths']) {
                    path.capture = false;
                }
            self.flows[permalink] = flow;
            return flow;
        });
    }
    addRecord(permalink, flow, entryDate, templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            console.log('EdiaryIonicService addRecord');
            const entry = yield this.addEntry(permalink, entryDate, templateId);
            const currEntry = (entry instanceof Entry) ? entry : entry['id'];
            flow.entry = currEntry;
            flow.owner = currEntry['owner'].id;
            // check if the flow is the proper one
            if (flow.id !== currEntry['template'].flow_process.id) {
                console.warn('EdiaryIonicService addRecord, flow inconsistent with created entry', entry, flow);
                throw new Error('Something went wrong with the communications with the server. Details: EdiaryIonicService addRecord inconsistent flow.');
            }
            const flow_response = yield flow.save();
            return this.updateEntry(currEntry, flow, flow_response);
            // return flow_response;
        });
    }
    updateEntry(entry, flow, flow_response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('EdiaryIonicService updateEntry, flowResponse', flow_response);
            let responseData = flow_response.data;
            console.log('EdiaryIonicService updateEntry, flowResponse data', responseData);
            // add the captured_value_group objec to the entry object
            // TODO, use proper setter and getter
            if (!entry.template)
                entry['template'] = {};
            entry.template.flow_process = flow;
            if (!entry.captured_value_group) {
                entry.captured_value_group = {
                    id: parseInt(responseData.relationships.captured_value_group.data.id),
                    type: responseData.relationships.captured_value_group.data.type
                };
            }
            else {
                entry.captured_value_group.id = parseInt(responseData.relationships.captured_value_group.data.id);
            }
            return entry;
        });
    }
    // updateEntryNew(entry, flow_response) {
    //   // Note: factory not yet supported
    //   factory.get(flow_response)
    //   .then( flowResponse => {
    //     console.log('EdiaryIonicService updateEntryNew, flowResponse deserialized', flowResponse);
    //     if ( !entry.captured_value_group)
    //       entry.captured_value_group = { id: parseInt(flowResponse.relationships.captured_value_group.data.id), type: flowResponse.relationships.captured_value_group.data.type};
    //     else
    //       entry.captured_value_group.id = parseInt(flowResponse.relationships.captured_value_group.data.id);
    //   })
    //   .catch( err => {
    //     console.log('EdiaryIonicService updateFlow deserialization error', err);
    //   });
    // }
    addEntry(permalink, entryDate, templateId) {
        return __awaiter(this, void 0, void 0, function* () {
            let mobileUser = Client.instance.user;
            // fetch the list of entryGroups
            let entryGroup = yield this.getEntryGroup(permalink);
            if (!entryGroup)
                throw 'Platform error: entryGroup ' + permalink + 'does not exist.';
            let template;
            if (templateId)
                template = entryGroup.entry_templates.find(el => el.id == templateId);
            else
                template = entryGroup.entry_templates[0];
            let date = moment(entryDate).format('YYYY-MM-DD');
            console.log('addEntry with date ' + date + ', from entryDate, template', entryDate, template);
            return mobileUser.addEntry({ 'date': date }, template);
        });
    }
    removeEntry(entry) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    saveEntry(entry) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
EdiaryIonicService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], EdiaryIonicService);
export { EdiaryIonicService };

//# sourceMappingURL=ediary.service.js.map
