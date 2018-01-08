import * as moment from 'moment';

export class LegacyDateValueConverter {
  toView(value) {
    return moment(value).format('DD/MM/YYYY hh:mm');
  }
}