import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { TranslatorService } from './translator.service';

@NgModule({
  imports: [HttpModule],
  providers: [TranslatorService]
})
export class TranslatorModule { }