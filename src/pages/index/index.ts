import { Framework7Engine } from 'aurelia-framework7-typescript';
import { inject } from 'aurelia-framework';


@inject(Framework7Engine)
export class Index {
  
  constructor (private f7:Framework7Engine) {
    
  }
}
