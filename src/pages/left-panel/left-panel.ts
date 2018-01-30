import { Framework7Engine } from 'aurelia-framework7-typescript';
import { inject } from 'aurelia-framework';
import { ModalService } from '../../services/ModalService';

@inject(Framework7Engine, ModalService)
export class LeftPanel {

    signedIn: boolean = false;
    app: Framework7;

    constructor (
        private f7:Framework7Engine, 
        private modalService: ModalService
    ) {
    }

    showAboutModal() {
        this.modalService.createModal({
            title: 'About the Application',
            template: 'about-the-application'
        });
    }
}
