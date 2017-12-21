import { inject } from 'aurelia-framework';
import { DataService } from '../../services/DataService';

@inject(DataService)
export class Closed {

    categories:ITenderCategories[]
   

    constructor(private DataService: DataService) {
    }

    activate() {
        console.log("Calling webservice to get data");
        this.DataService.GetClosedCategories()
            .then((result) => {
                this.categories = result;
            })
            .catch((error) => {
                alert("Error:" + error);
            });
    }
}