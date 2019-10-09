import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { clinical6, languageService, Language } from 'clinical6';

export type LanguageMap = { [id: string]: Language; };

@Injectable()
export class TranslatorService {
  language: Language;

  languages: Array<Language>;

  constructor(public http: Http,
              public platform: Platform) {
    // console.log('TranslatorService created');
   }

  // FOR FIRST LAUNCH OF TRANSLATOR
  async init() {
      const iso = localStorage.getItem('language_iso') || 'en';
      this.language = new Language({ iso });

      try {
        const data = await this.language.getTranslations();
        const langs: any = await languageService.get();
        if (langs instanceof Array) {
          this.languages = langs;
        }
        else if (langs instanceof Language) {
          this.languages = [];
          this.languages.push(langs);
        }
        // check if langs is a Language Map { [id: string]: Language; }
        else if ( langs && langs instanceof Object) {

            // this.languages = Object.values(langs);
            // not sure why typescript do not understand Object Values
            // using here the suggested polyfill
            /* 
              const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
              const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
              const concat = Function.bind.call(Function.call, Array.prototype.concat);
              const keys = Reflect.ownKeys;
              if (!Object.values) {
                Object.values = function values(O) {
                  return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
                };
              }
            */
            // this fails
            // this.languages = Object.keys(langs).reduce( (v, k) => v.concat( typeof k === 'string' && langs.propertyIsEnumerable(k) ? [langs[k]] : [] ), []);
          this.languages = Object.keys(langs).reduce( (v, k) => v.concat( typeof k === 'string' ? [langs[k]] : [] ), []);
        }
        else {
          // Assert error
          console.error('ionic-clinical6 TranslatorService init(). Assert error, this should be an unreachable branch', langs);
        }
      }
      catch (reason) {
        console.warn('ionic-clinical6 TranslatorService init(). Getting translation from service failed', reason);
        return await this.getLocalTranslations(iso);
      }
  }

  // CHANGE USED LANG AND RELOAD TRANSLATIONS
  async setLanguage(iso: string) {

      localStorage.setItem('language_iso', iso);
      this.language = new Language({ iso });

      try {
        await this.language.getTranslations()
      } catch(reason) {
          console.warn('ionic-clinical6 setLanguage getting translation from service failed', reason)
          return await this.getLocalTranslations(iso);
      }
  }

  // CHANGE LANG ID ON PROFILE
  async setProfileLang() {
      const iso = localStorage.getItem('language_iso') || 'en';
      try {
        const profile = await clinical6.getProfile();
        profile.language =  new Language({ iso });
        await profile.save();
      } catch (err) {
        console.error(err);
      }
  }

  // RTL SUPPORT
  rtlMode(enable: boolean) {
    if (enable) {
       this.platform.setDir('rtl', true);
    }
    else {
       this.platform.setDir('ltr', true);
    }
  }

  // GET SUPPORTED LANGS FROM PLATFORM
  async getLanguages(translations: boolean = true) {
    return await languageService.getLanguages(translations);
  }

  // GET TRANSLATIONS FROM PLATFORM
  async getTranslations(iso: string) {
    return await languageService.getTranslations(iso);
  }

  // GET TRANSLATIONS FROM LOCAL
  getLocalTranslations(id: string) {
    return this.http.get('assets/i18n/' + id + '.json')
      .map(res => res.json()).toPromise()
      .catch(error => {
        console.log('Translator Error (local): ' + error);
        return Observable.throw('Could not load data from local');
      })
      .then(data => {
        this.language._translations = data;
        return data;
      });
  }

  /**
   * Retrieve a translation for the current language, optionally replacing tokenized
   * values (e.g. '{{patientId}}') with tokens provided (e.g. { patientId: '123456' }).
   * 
   * NOTE: Translations are typically wrapped in <p> tags.  Use `getInnerHTML` for the inner content
   */
  get(label: string, tokens: {[key: string]: any} = null) {
    if (!this.language || !this.language._translations) {
      return null;
    }
    let translation = null;
    try {
      translation = this.language.translate(label) || '';
    } catch(error) {
      console.log(error);
    }

    if (translation && tokens) {
      // Replace tokens (e.g. {{patientId}}) with their values in the translated results.
      translation = Object.keys(tokens)
        .reduce((tran, tokenKey) => {
          return this.replaceToken(tran, tokenKey, tokens[tokenKey]);
        }, translation);
    }
    return translation;
  }

  private replaceToken(translation: string, tokenKey: string, tokenValue: any): string {
    return translation.replace(`{{${tokenKey}}}`, tokenValue);
  }

  // THIS WILL BE CALLED TO REMOVE ALL
  // HTML TAGS FROM VALUE
  getInnerHTML(label: string, tokens: {[key: string]: any} = null) {
    return this.htmlContent(this.get(label, tokens));
  }

  // HELP FUNCTION
  htmlContent(html: any) {
    if (!html || html === '') return '';
    let template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild.textContent;
  }
}