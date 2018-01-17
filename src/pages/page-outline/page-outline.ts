import { inject } from 'aurelia-framework';
import { DataService } from '../../services/DataService';
import { PageData, PageCallbackObject } from 'framework7';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DataService, EventAggregator)
export class PageOutline {

    entry: ITender;
    cat: string;
    intNums: string[];
    list: IListResponse;

    constructor(private DataService: DataService, private ea: EventAggregator) {

    }

    onLoad = (pd: PageData) => {
        if (pd.name = "page-outline" && pd.query.id) {
            this.cat = pd.query.cat;
            console.log("data:" + pd.query.id);
            console.log("Calling webservice to get " + pd.query.cat + " data");
            this.DataService.GetDataById(pd.query.id, pd.query.cat)
                .then((result) => {
                    this.entry = result;
                    this.formatPhones(result.projectOfficerPhone, result.generalEnquiriesPhone, result.technicalEnquiriesPhone);
                })
                .catch((error) => {
                    alert("Error: " + error);
                });
                this.list = null;
            this.DataService.GetListById(pd.query.id, pd.query.cat)
                .then((result) => {
                    this.list = result;
                })
                .catch((error) => {
                    alert("Error: " + error);
                });
        }
    }

    activate() {
        this.ea.subscribe("page:reinit", this.onLoad);
        this.ea.subscribe("page:init", this.onLoad);
    }

    formatPhones(project: string, general: string, technical: string) {
        var numbers = [project, general, technical];
        this.intNums = [];
        numbers.forEach((num, index) => {
            if (num != null) {
                if (num.slice(0, 2) == "08") {
                    numbers[index] = num.slice(0, 2) + " " + num.slice(2, 6) + " " + num.slice(6, 10);
                } else {
                    numbers[index] = num.slice(0, 4) + " " + num.slice(4, 7) + " " + num.slice(7, 10);
                }
                this.intNums[index] = numbers[index].substr(1);
            }
        });
        this.entry.projectOfficerPhone = numbers[0];
        this.entry.generalEnquiriesPhone = numbers[1];
        this.entry.technicalEnquiriesPhone = numbers[2];
    }
}