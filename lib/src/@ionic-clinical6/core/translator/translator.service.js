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
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { clinical6, languageService, Language } from 'clinical6';
let TranslatorService = class TranslatorService {
    constructor(http, platform) {
        this.http = http;
        this.platform = platform;
        // console.log('TranslatorService created');
    }
    // FOR FIRST LAUNCH OF TRANSLATOR
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const iso = localStorage.getItem('language_iso') || 'en';
            this.language = new Language({ iso });
            try {
                const data = yield this.language.getTranslations();
                const langs = yield languageService.get();
                if (langs instanceof Array) {
                    this.languages = langs;
                }
                else if (langs instanceof Language) {
                    this.languages = [];
                    this.languages.push(langs);
                }
                else if (langs && langs instanceof Object) {
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
                    this.languages = Object.keys(langs).reduce((v, k) => v.concat(typeof k === 'string' ? [langs[k]] : []), []);
                }
                else {
                    // Assert error
                    console.error('ionic-clinical6 TranslatorService init(). Assert error, this should be an unreachable branch', langs);
                }
            }
            catch (reason) {
                console.warn('ionic-clinical6 TranslatorService init(). Getting translation from service failed', reason);
                return yield this.getLocalTranslations(iso);
            }
        });
    }
    // CHANGE USED LANG AND RELOAD TRANSLATIONS
    setLanguage(iso) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem('language_iso', iso);
            this.language = new Language({ iso });
            try {
                yield this.language.getTranslations();
            }
            catch (reason) {
                console.warn('ionic-clinical6 setLanguage getting translation from service failed', reason);
                return yield this.getLocalTranslations(iso);
            }
        });
    }
    // CHANGE LANG ID ON PROFILE
    setProfileLang() {
        return __awaiter(this, void 0, void 0, function* () {
            const iso = localStorage.getItem('language_iso') || 'en';
            try {
                const profile = yield clinical6.getProfile();
                profile.language = new Language({ iso });
                yield profile.save();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // RTL SUPPORT
    rtlMode(enable) {
        if (enable) {
            this.platform.setDir('rtl', true);
        }
        else {
            this.platform.setDir('ltr', true);
        }
    }
    // GET SUPPORTED LANGS FROM PLATFORM
    getLanguages(translations = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield languageService.getLanguages(translations);
        });
    }
    // GET TRANSLATIONS FROM PLATFORM
    getTranslations(iso) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield languageService.getTranslations(iso);
        });
    }
    // GET TRANSLATIONS FROM LOCAL
    getLocalTranslations(id) {
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
    get(label, tokens = null) {
        if (!this.language || !this.language._translations) {
            return null;
        }
        let translation = null;
        try {
            translation = this.language.translate(label) || '';
        }
        catch (error) {
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
    replaceToken(translation, tokenKey, tokenValue) {
        return translation.replace(`{{${tokenKey}}}`, tokenValue);
    }
    // THIS WILL BE CALLED TO REMOVE ALL
    // HTML TAGS FROM VALUE
    getInnerHTML(label, tokens = null) {
        return this.htmlContent(this.get(label, tokens));
    }
    // HELP FUNCTION
    htmlContent(html) {
        if (!html || html === '')
            return '';
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild.textContent;
    }
};
TranslatorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        Platform])
], TranslatorService);
export { TranslatorService };

//# sourceMappingURL=translator.service.js.map
