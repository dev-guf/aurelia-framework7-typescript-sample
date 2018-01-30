import { Framework7Engine } from 'aurelia-framework7-typescript';
import { inject, singleton } from 'aurelia-framework';

interface ModalOptions {
    title: string,
    template: string,
    buttons?: any
}

interface PopupOptions {
    template: string
}

export interface IModalService {
    createModal(options: ModalOptions);
}

@singleton()
@inject(Framework7Engine)
export class ModalService implements IModalService {

    constructor (private f7:Framework7Engine) {
    }
    
    createModal(options: ModalOptions) {
        var modal = this.f7.instance.modal({
            title: options.title,
            text: require('../templates/modals/' + options.template + '.html'),
            buttons: options.buttons ? options.buttons : [{text: 'Ok'}],
            verticalButtons: false,
            onClick: null
        });
    }

    createPopup(options: PopupOptions) {
        var popup = this.f7.instance.popup(
            require('../templates/popups/' + options.template +'.html')
        );
    }
}