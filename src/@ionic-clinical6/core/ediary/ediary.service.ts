import { Injectable } from '@angular/core';
import { clinical6, User, flowService, Flow, eDiaryService, Client, Entry, StorageUtility } from 'clinical6';
import * as moment from 'moment';
import { Flows } from '../';
import { isArray } from 'ionic-angular/util/util';

@Injectable()
export class EdiaryIonicService {

  profile;
  mobileUser: User;
  // entryGroups;
  // ventilatorFlow: Flow;
  flows = {};

  constructor(
  ) {
  }

  async getMobileUser() {
    return clinical6.user;
  }

  async getEntries(permalink?: string, date?: string) {
    let mobileUser = clinical6.user;
      // set the filter
      let filter = {};
      if (permalink)
        filter['entry_group_id'] = await this.getEntryGroupId(permalink);
      if (date)
        filter['date'] = date;
      // mobileUserService.getEntries(mobileUser, null, 'networkFirst') // alternative
      return await mobileUser.getEntries(filter, 'networkFirst');
      // return mobileUser.getEntries(filter, 'cacheFirst');
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

  async getEntryGroups() {
    const self = this;    
    const storageUtility = StorageUtility.instance;
    const entryGroups = await storageUtility.get('ediary__entry_groups', {asArray: true});
    // console.log('EdiaryIonicService getEntryGroups cache', entryGroups);
    if (entryGroups.length > 0) 
      return entryGroups;
    else {
      console.log('getEntryGroups new', entryGroups);          
      const _entryGroups = await eDiaryService.get('networkFirst');
      // console.log('EdiaryIonicService getEntryGroups network', entryGroups);
      // self.entryGroups = entryGroups;
      return _entryGroups;
    }
  }

  async getEntryGroupId(permalink) {
    let id = null;
    const entryGroups = await this.getEntryGroups();
    if (entryGroups && isArray(entryGroups)) {
      let entry = entryGroups.find( entry => entry.permanentLink === permalink);
      if (entry)
        id = entry.id;
    }
    return id;
  }

  async getEntryGroup(permalink: string) {
    let entryGroup = null;
    const entryGroups = await this.getEntryGroups();
    if (entryGroups) {
      entryGroup = entryGroups.find( entry => entry.permanentLink === permalink);
    }
    return entryGroup;
  }

  async getFlowFromEntry(entry) {
    return entry.template.flow_process;
  }

  async getFlow(permalink: string) {
    let localFlow = this.flows[permalink];
    if (localFlow) {
      localFlow.reset();
      return localFlow;
    }
    const self = this;
    const flow = await flowService.getFlow(permalink);
    // set the capture of all the paths to false except the last one
    // ... in case the flow is not properly set from the platform
    for (let step of flow.steps)
      for (let path of step['paths']) {
        path.capture = false;
      }
    self.flows[permalink] = flow;
    return flow;
  }

  async addRecord(permalink: string, flow: Flow, entryDate: string, templateId?: number) {
    const self = this;
    console.log('EdiaryIonicService addRecord');
    const entry = await this.addEntry(permalink, entryDate, templateId);
    const currEntry = (entry instanceof Entry) ? entry : entry['id'];

    flow.entry = currEntry;
    flow.owner = currEntry['owner'].id;

    // check if the flow is the proper one
    if (flow.id !== currEntry['template'].flow_process.id) {
      console.warn('EdiaryIonicService addRecord, flow inconsistent with created entry', entry, flow);
      throw new Error ('Something went wrong with the communications with the server. Details: EdiaryIonicService addRecord inconsistent flow.');
    }
    const flow_response = await flow.save();
    return this.updateEntry(currEntry, flow, flow_response);
    // return flow_response;
  }

  async updateEntry(entry, flow, flow_response) {
    console.log('EdiaryIonicService updateEntry, flowResponse', flow_response);    
      let responseData = flow_response.data;

      console.log('EdiaryIonicService updateEntry, flowResponse data', responseData);

      // add the captured_value_group objec to the entry object
      // TODO, use proper setter and getter

      if (!entry.template) entry['template'] = {};
      entry.template.flow_process = flow;

      if ( !entry.captured_value_group) {
        entry.captured_value_group = { 
          id: parseInt(responseData.relationships.captured_value_group.data.id), 
          type: responseData.relationships.captured_value_group.data.type};
      }
      else {
        entry.captured_value_group.id = parseInt(responseData.relationships.captured_value_group.data.id);
      }
      return entry;
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

  async addEntry (permalink: string, entryDate: string, templateId?: number) {
    let mobileUser = Client.instance.user;
    // fetch the list of entryGroups

    let entryGroup = await this.getEntryGroup(permalink);
    if (!entryGroup)
      throw 'Platform error: entryGroup ' + permalink + 'does not exist.';

    let template;
    if (templateId)
      template = entryGroup.entry_templates.find( el => el.id == templateId);
    else
      template = entryGroup.entry_templates[0];
      
    let date = moment(entryDate).format('YYYY-MM-DD');
    console.log('addEntry with date ' + date + ', from entryDate, template', entryDate, template);

    return mobileUser.addEntry( {'date': date}, template );
  }

  async removeEntry (entry) {
  }

  async saveEntry ( entry ) {
  }

}
