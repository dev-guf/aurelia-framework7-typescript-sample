import * as moment from 'moment';

export class ShortDateValueConverter {
  toView(value) {
    return moment(value).format('DD/MM/YYYY');
  }
}