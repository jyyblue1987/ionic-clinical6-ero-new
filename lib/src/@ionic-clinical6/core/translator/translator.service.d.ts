import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Language } from 'clinical6';
export declare type LanguageMap = {
    [id: string]: Language;
};
export declare class TranslatorService {
    http: Http;
    platform: Platform;
    language: Language;
    languages: Array<Language>;
    constructor(http: Http, platform: Platform);
    init(): Promise<any>;
    setLanguage(iso: string): Promise<any>;
    setProfileLang(): Promise<void>;
    rtlMode(enable: boolean): void;
    getLanguages(translations?: boolean): Promise<Language | {
        [id: string]: Language;
    }>;
    getTranslations(iso: string): Promise<any>;
    getLocalTranslations(id: string): Promise<any>;
    /**
     * Retrieve a translation for the current language, optionally replacing tokenized
     * values (e.g. '{{patientId}}') with tokens provided (e.g. { patientId: '123456' }).
     *
     * NOTE: Translations are typically wrapped in <p> tags.  Use `getInnerHTML` for the inner content
     */
    get(label: string, tokens?: {
        [key: string]: any;
    }): any;
    private replaceToken(translation, tokenKey, tokenValue);
    getInnerHTML(label: string, tokens?: {
        [key: string]: any;
    }): string;
    htmlContent(html: any): string;
}
