import {FrameworkConfiguration} from "aurelia-framework";
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.globalResources(PLATFORM.moduleName('./LegacyDateValueConverter'));
}