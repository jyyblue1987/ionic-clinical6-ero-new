var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { clinical6, flowService, eDiaryService, Client, Entry } from 'clinical6';
import * as moment from 'moment';
import { EdiaryIonicService } from './ediary.service';
let EdiaryIonicServiceAP = class EdiaryIonicServiceAP extends EdiaryIonicService {
    constructor() {
        super();
    }
    getEntryGroupId(permalink) {
        let id = null;
        if (this.entryGroups) {
            let entry = this.entryGroups.find(entry => entry.permanentLink === permalink);
            if (entry)
                id = entry.id;
        }
        return id;
    }
    getEntryGroup(permalink) {
        let entryGroup = null;
        if (this.entryGroups) {
            entryGroup = this.entryGroups.find(entry => entry.permanentLink === permalink);
        }
        return entryGroup;
    }
    // The following is a perfect example of the Promise Anti-Pattern of the getEntry method
    getEntriesAP(permalink, date) {
        return new Promise((resolve, reject) => {
            this.getEntryGroups()
                .then(entryGroups => {
                let mobileUser = clinical6.user;
                // set the filter
                let filter = {};
                if (permalink)
                    filter['entry_group_id'] = this.getEntryGroupId(permalink);
                if (date)
                    filter['date'] = date;
                // mobileUserService.getEntries(mobileUser, null, 'networkFirst') // alternative
                mobileUser.getEntries(filter, 'networkFirst')
                    .then(entries => {
                    // console.log('EdiaryIonicService getEntries', entries);
                    resolve(entries);
                })
                    .catch(reason => reject(reason));
            })
                .catch(reason => reject(reason));
        });
    }
    // The following is a perfect example of the Promise Anti-Pattern of the getEntryGroups method
    getEntryGroupsAP() {
        // fetch the list of entryGroups
        return new Promise((resolve, reject) => {
            if (this.entryGroups) {
                resolve(this.entryGroups);
                return;
            }
            const self = this;
            eDiaryService.get('networkFirst') // should be cacheFirst
                .then(entryGroups => {
                console.log('EdiaryIonicService getEntryGroups', entryGroups);
                self.entryGroups = entryGroups;
                resolve(entryGroups);
            })
                .catch(reason => {
                console.log('EdiaryIonicService getEntryGroups error', reason);
                reject(reason);
            });
        });
    }
    // The following is a perfect example of the Promise Anti-Pattern of the getFlow method
    getFlowAP(permalink) {
        return new Promise((resolve, reject) => {
            let localFlow = this.flows[permalink];
            if (localFlow) {
                localFlow.reset();
                resolve(localFlow);
                return;
            }
            const self = this;
            flowService.getFlow(permalink)
                .then(flow => {
                // set the capture of all the paths to false except the last one
                // ... in case the flow is not properly set from the platform
                for (let step of flow.steps)
                    for (let path of step['paths']) {
                        path.capture = false;
                    }
                self.flows[permalink] = flow;
                resolve(flow);
            })
                .catch(reason => reject(reason));
        });
    }
    // The following is a perfect example of the Promise Anti-Pattern of the addRecord method
    addRecordAP(permalink, flow, entryDate, templateId) {
        return new Promise((resolve, reject) => {
            const self = this;
            console.log('EdiaryIonicService addRecord');
            this.addEntry(permalink, entryDate, templateId)
                .then(entry => {
                const currEntry = (entry instanceof Entry) ? entry : entry['id'];
                flow.entry = currEntry;
                flow.owner = currEntry['owner'].id;
                // check if the flow is the proper one
                if (flow.id !== currEntry['template'].flow_process.id) {
                    console.warn('EdiaryIonicService addRecord, flow inconsistent with created entry', JSON.stringify(entry), JSON.stringify(flow));
                    reject('Something went wrong with the communications with the server. Details: EdiaryIonicService addRecord inconsistent flow.');
                }
                flow.save()
                    .then(flow_response => {
                    self.updateEntry(entry, flow, flow_response)
                        .then(() => resolve(currEntry))
                        .catch(reason => reject(reason));
                })
                    .catch(reason => reject(reason));
            })
                .catch(reason => reject(reason));
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
    // The following is a perfect example of the Promise Anti-Pattern of the getFlow method
    addEntryAP(permalink, entryDate, templateId) {
        return new Promise((resolve, reject) => {
            let mobileUser = Client.instance.user;
            // fetch the list of entryGroups
            this.getEntryGroups()
                .then(entryGroups => {
                let entryGroup = this.getEntryGroup(permalink);
                if (!entryGroup)
                    throw 'Platform error: entryGroup ' + permalink + 'does not exist.';
                let template;
                if (templateId)
                    template = entryGroup.entry_templates.find(el => el.id == templateId);
                else
                    template = entryGroup.entry_templates[0];
                let date = moment(entryDate).format('YYYY-MM-DD');
                console.log('addEntry date, template', date, template);
                mobileUser.addEntry({ 'date': date }, template)
                    .then(entry => {
                    console.log('eDiary addEntry', entry);
                    resolve(entry);
                })
                    .catch(reason => {
                    console.warn('eDiary addEntry fail', reason);
                    reject(reason);
                });
            })
                .catch(reason => {
                console.warn('eDiary addEntry fail', reason);
                reject(reason);
            });
        });
    }
};
EdiaryIonicServiceAP = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], EdiaryIonicServiceAP);
export { EdiaryIonicServiceAP };

//# sourceMappingURL=anti-pattern-examples.js.map
