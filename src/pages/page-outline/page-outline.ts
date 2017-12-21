import { inject } from 'aurelia-framework';
import { DataService } from '../../services/DataService';
import { PageData, PageCallbackObject } from 'framework7';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DataService, EventAggregator)
export class PageOutline {

    entry: ITender;
    id: number;

    constructor(private DataService: DataService, private ea: EventAggregator) {
    }


    onLoad = (pd: PageData) => {
        if (pd.name = "page-outline" && pd.query.id) {
            this.id = pd.query.id;
            console.log("data:" + pd.query.id);
            console.log("Calling webservice to get data");
            this.DataService.GetDataById(this.id)
                .then((result) => {
                    this.entry = result;
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
}