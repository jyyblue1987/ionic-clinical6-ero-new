import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Clinical6Service } from '../../clinical6.service';
import { AlertModalPage } from '../../modal/alert-modal';
import { AppConfig } from '../../config';
import { TranslatorService } from '../../translator/translator.service';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'glossary-page',
  templateUrl: 'glossary.html'
})
export class GlossaryPage {
    loadingCtrl: any;
    image: string;
    title: string;
    glossary: Array<{title: string, position: number, details: string, expanded: boolean, detailsHeight: string}>;
    filteredGlossary: Array<any>;
    permLink: string;

    constructor(
        public nav: NavController,
        public translator: TranslatorService,
        public captiveReach: Clinical6Service,
        public navParams: NavParams,
        public loader: LoadingController,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public _sanitizer: DomSanitizer
    ) {
        // shows a loading control while data is being gathered
        this.loadingCtrl = this.loader.create({content: 'Loading...'});
        this.loadingCtrl.present();

        this.title = navParams.get('menu') &&  navParams.get('menu').title || 'glossary';
        this.glossary = [];
        this.permLink = navParams.get('permanent_link') || 'glossary';

        var thisRef = this;
        this.captiveReach.getDynamicContent(this.permLink)
            .then(result => {
                thisRef.loadingCtrl.dismiss();
                let res = result as Array<any>;
                res.forEach( item => {
                    let maxDisplayedChars = 40;
                    let label = (item.title.length > maxDisplayedChars) ?
                                 item.title.substr(0, maxDisplayedChars) + '...' :
                                 item.title;
                    thisRef.glossary.push({
                        title: label,
                        position: parseInt(item.position),
                        details: item.description || item.rich_text,
                        expanded: false,
                        detailsHeight: ''
                    });
                });
                thisRef.glossary.sort((a, b) => {
                    if (a.title > b.title) { return 1; }
                    if (a.title < b.title) { return -1; }
                    return 0;
                });
                this.resetFilter();
            }).catch(e => {
                thisRef.loadingCtrl.dismiss()
                    .then( () => {
                        AlertModalPage.show(
                                thisRef, {
                                    type: 'type_error',
                                    body: 'Please make sure you have a working network connection.',
                                    subTitle: 'Unable to retrieve data from server' });
                    });
                console.log('get Glossary error: ', e);
            });
    }
    resetFilter() {
        this.filteredGlossary = this.glossary;
    }
    getItems(ev: any) {
        this.resetFilter();
        let searchKey = ev.target.value;

        // if the value is an empty string don't filter the items
        if (searchKey && searchKey.trim() !== '') {
            this.filteredGlossary = this.filteredGlossary.filter((item) => {
                return (item.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);
            });
        }
    }
    toggleDetails(item: {title: string, position: number, details: string, expanded: boolean, detailsHeight: string}) {
        if (item.expanded) {
            item.expanded = false;
        } else {
            this.glossary.forEach((i) => { i.expanded = false; });
            item.expanded = true;

            if (item.detailsHeight === '') {
                // Calculates the appropriate height of the item's DOM element
                // ... by doing some DOM tricks
                document.getElementById('item_' + item.position).style.height = 'auto';
                var height = document.getElementById('item_' + item.position).offsetHeight + 'px';
                document.getElementById('item_' + item.position).style.height = '0px';

                // needed to allow for the renderer to complete all previous commands
                // and render the wanted height properly
                setTimeout(() => { item.detailsHeight = height; }, 50);
            }
        }
    }
}