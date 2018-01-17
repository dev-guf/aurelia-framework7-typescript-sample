import { Framework7Engine } from 'aurelia-framework7-typescript';
import { inject } from 'aurelia-framework';

@inject(Framework7Engine)
export class LeftPanel {

    signedIn: boolean = false;
    app: Framework7;

    constructor (private f7:Framework7Engine) {
    }

    showAboutModal() {
        var modal = this.f7.instance.modal({
            title: 'About the Application',
            text: require('../popups/about-the-application.html'),
            buttons: [],
            verticalButtons: false,
            onClick: function() {}
        });
    }
}
