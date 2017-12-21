import { Index } from './../pages/index/index';
import { filter } from 'lodash';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject, singleton } from 'aurelia-framework';

export interface IDataService {
    GetAllTenders(): Promise<ITenderResponse>;
    GetCurrentCategories(): Promise<ITenderCategories[]>
    GetClosedCategories(): Promise<ITenderCategories[]>
    GetAwardedCategories(): Promise<ITenderCategories[]>
    GetFutureCategories(): Promise<ITenderCategories[]>
    GetDataById(Id: number): Promise<ITender>
}

@singleton()
@inject(HttpClient)
export class DataService implements IDataService {

    baseUrl: string = "https://tendersonline-mobile.nt.gov.au/json/syncreply/";

    constructor(
        public httpClient: HttpClient
    ) {
    };

    GetCurrentCategories(): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetCurrentData().then(response => {
                var output: ITenderCategories[] = [];
                for (let entry of response.items) {
                    if (output.length > 0) {
                        for (let category of output) {
                            if (entry.category === category.name) {
                                category.items.push(entry);
                                break;
                            } else if (category.name === (output[(output.length - 1)].name)) {
                                output.push({ "name": entry.category, "items": [entry] });
                                break;
                            }
                        }
                    } else {
                        output.push({ "name": entry.category, "items": [entry] });
                    }
                }

                accept(output);
            });
        });
        return promise;
    }

    GetClosedCategories(): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetClosedData().then(response => {
                var output: ITenderCategories[] = [];
                for (let entry of response.items) {
                    if (output.length > 0) {
                        for (let category of output) {
                            if (entry.category === category.name) {
                                category.items.push(entry);
                                break;
                            } else if (category.name === (output[(output.length - 1)].name)) {
                                output.push({ "name": entry.category, "items": [entry] });
                                break;
                            }
                        }
                    } else {
                        output.push({ "name": entry.category, "items": [entry] });
                    }
                }

                accept(output);
            });
        });
        return promise;
    }

    GetAwardedCategories(): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetAwardedData().then(response => {
                var output: ITenderCategories[] = [];
                for (let entry of response.items) {
                    if (output.length > 0) {
                        for (let category of output) {
                            if (entry.category === category.name) {
                                category.items.push(entry);
                                break;
                            } else if (category.name === (output[(output.length - 1)].name)) {
                                output.push({ "name": entry.category, "items": [entry] });
                                break;
                            }
                        }
                    } else {
                        output.push({ "name": entry.category, "items": [entry] });
                    }
                }

                accept(output);
            });
        });
        return promise;
    }

    GetFutureCategories(): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetFutureData().then(response => {
                var output: ITenderCategories[] = [];
                for (let entry of response.items) {
                    if (output.length > 0) {
                        for (let category of output) {
                            if (entry.category === category.name) {
                                category.items.push(entry);
                                break;
                            } else if (category.name === (output[(output.length - 1)].name)) {
                                output.push({ "name": entry.category, "items": [entry] });
                                break;
                            }
                        }
                    } else {
                        output.push({ "name": entry.category, "items": [entry] });
                    }
                }

                accept(output);
            });
        });
        return promise;
    }

    GetAllTenders(): Promise<ITenderResponse> {
        return this.httpClient.fetch(this.baseUrl + "tenderListv2")
            .then<ITenderResponse>((response) => {
                return response.json();
            });
    }

    GetCurrentData(): Promise<ITenderResponse> {
        return this.httpClient.fetch(this.baseUrl + "tenderListv2?type=current")
            .then<ITenderResponse>((response) => {
                return response.json();
            });
    }

    GetClosedData(): Promise<ITenderResponse> {
        return this.httpClient.fetch(this.baseUrl + "tenderListv2?type=closed")
            .then<ITenderResponse>((response) => {
                return response.json();
            });
    }

    GetAwardedData(): Promise<ITenderResponse> {
        return this.httpClient.fetch(this.baseUrl + "tenderListv2?type=awarded")
            .then<ITenderResponse>((response) => {
                return response.json();
            });
    }

    GetFutureData(): Promise<ITenderResponse> {
        return this.httpClient.fetch(this.baseUrl + "tenderListv2?type=future")
            .then<ITenderResponse>((response) => {
                return response.json();
            });
    }

    GetDataById(Id: number): Promise<ITender> {
        var promise = new Promise<ITender>((accept, reject) => {
            this.GetAllTenders().then(response => {
                var output: ITender;
                for (let entry of response.items) {
                    if (entry.rftId == Id) {
                        output = entry;
                        break;
                    }
                }
                accept(output);
            });
        });
        return promise;
    }


    /*
    
        GetClosedData(): Promise<IListEntry[]> {
            var promise = new Promise<IListEntry[]>((accept, reject) => {
    
                    var result: IListEntry[] = [];
                    for (let entry of this.data) {
                        if (entry.type == 'closed') {
                            result.push(entry);
                        } // 1, "string", false
                    }
                    if (result != null) {
                        accept(result);
                    } else {
                        reject("No entries for Type: Closed.");
                    }
                    accept(this.data);
                    //reject("OOppps, some error occurred");
            });
    
            return promise;
        }
    
        GetAwardedData(): Promise<IListEntry[]> {
            var promise = new Promise<IListEntry[]>((accept, reject) => {
    
                    var result: IListEntry[] = [];
                    for (let entry of this.data) {
                        if (entry.type == 'awarded') {
                            result.push(entry);
                        } // 1, "string", false
                    }
                    if (result != null) {
                        accept(result);
                    } else {
                        reject("No entries for Type: Awarded.");
                    }
                    accept(this.data);
                    //reject("OOppps, some error occurred");
            });
    
            return promise;
        }
    
        GetDataById(id: number): Promise<IListEntry> {
            var promise = new Promise<IListEntry>((accept, reject) => {
    
                
                    for (let entry of this.data) {
                        if (entry.ID == id) {
                            var result = entry;
                            break;
                        } // 1, "string", false
                    }
                    if (result != null) {
                        accept(result);
                    } else {
                        if (id != null) {
                            reject("Oops, no entry for ID: " + id + ".");
                        } else {
                            accept();
                        }
                    }
            });
    
            return promise;
        }
        
        GetFutureData(): Promise<ITenderResponse> {
            return this.httpClient.fetch(this.baseUrl + "futureList")
            .then<ITenderResponse>((response)=>{
                return response.json();
            });
        }*/
}