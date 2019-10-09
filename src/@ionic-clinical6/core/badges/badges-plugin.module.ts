import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BadgesPluginService } from './badges-plugin.service';

@NgModule({
  imports: [HttpModule],
  providers: [BadgesPluginService]
})
export class BadgesPluginModule {
  
}