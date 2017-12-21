import { inject } from 'aurelia-framework';
import { DataService } from '../../services/DataService';

@inject(DataService)
export class Current {

    categories:ITenderCategories[]
   

    constructor(private DataService: DataService) {
    }

    activate() {
        console.log("Calling webservice to get data");
        this.DataService.GetCurrentCategories()
            .then((result) => {
                this.categories = result;
            })
            .catch((error) => {
                alert("Error:" + error);
            });
    }
}