/* eslint-disable no-undef */
import 'aurelia-bootstrapper'
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

export function configure (aurelia: Aurelia) {

    aurelia.use
      .basicConfiguration()
      .developmentLogging()
      .feature(PLATFORM.moduleName('value-converters/index'))
      .plugin(PLATFORM.moduleName('aurelia-framework7-typescript'));
    
    aurelia.start().then(() => {
      aurelia.setRoot()
    });
}