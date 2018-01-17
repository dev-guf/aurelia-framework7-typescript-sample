import * as moment from 'moment';

export class CalendarDateValueConverter {
  toView(value) {
    return moment(value).format('DD MMM YYYY');
  }
}