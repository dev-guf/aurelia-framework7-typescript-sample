import { inject } from 'aurelia-framework';
import { DataService } from '../../services/DataService';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DataService, EventAggregator)
export class Current {

    categories: ITenderCategories[]


    constructor(private DataService: DataService, private ea: EventAggregator) {
    }

    activate() {
        console.log("Calling webservice to get data");
        this.DataService.GetCurrentCategories('cat')
            .then((result) => {
                this.categories = result;
            })
            .catch((error) => {
                alert("Error:" + error);
            });
        this.ea.subscribe("pageUpdate1", response => {
            this.categories = [];
            this.refresh(response);
        });
    }

    refresh(cats: string) {
        console.log("Calling webservice to get data");
        this.DataService.GetCurrentCategories(cats)
            .then((result) => {
                this.categories = result;
            })
            .catch((error) => {
                alert("Error:" + error);
            });
    }
}