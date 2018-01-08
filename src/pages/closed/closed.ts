import { inject } from 'aurelia-framework';
import { DataService } from '../../services/DataService';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DataService, EventAggregator)
export class Closed {

    categories: ITenderCategories[]


    constructor(private DataService: DataService, private ea: EventAggregator) {
    }

    activate() {
        console.log("Calling webservice to get data");
        this.DataService.GetClosedCategories('cat')
            .then((result) => {
                this.categories = result;
            })
            .catch((error) => {
                alert("Error:" + error);
            });
        this.ea.subscribe("pageUpdate2", response => {
            this.categories = [];
            this.refresh(response);
        });
    }

    refresh(cats: string) {
        console.log("Calling webservice to get data");
        this.DataService.GetClosedCategories(cats)
            .then((result) => {
                this.categories = result;
            })
            .catch((error) => {
                alert("Error:" + error);
            });
    }
}