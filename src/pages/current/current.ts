import { inject, computedFrom, bindable } from 'aurelia-framework';
import { DataService } from '../../services/DataService';
import { bindingMode } from "aurelia-binding";

@inject(DataService)
export class Current {
    @bindable
    currentCat: string = null;
    @bindable
    searchText: string;
    @bindable
    categories: ITenderCategories[];

    opts: string[] = ['none', 'age', 'reg', 'cat', 'req', 'rel', 'clo'];

    constructor(private DataService: DataService) {
        window['currentController'] = this;
    }

    activate() {
        console.log("Activating");
        this.currentCat = "3";
        this.currentCatChanged();
    }

    private currentCatChanged() {
        this.categories = [];
        console.log("Loading Data for category:" + this.opts[+this.currentCat]);
        this.DataService.GetCurrentCategories(this.opts[+this.currentCat], this.searchText)
            .then((result) => {
                this.categories = result;
                console.log("Got Data");
            })
            .catch((error) => {
                alert("Error:" + error);
            });
    }

    private searchTextChanged() {
        console.log("Loading Data for Text:" + this.searchText);
        this.categories = [];
        this.DataService.GetCurrentCategories(this.opts[+this.currentCat], this.searchText)
            .then((result) => {
                this.categories = result;
                console.log("Got Data");
            })
            .catch((error) => {
                alert("Error:" + error);
            });
    }
}