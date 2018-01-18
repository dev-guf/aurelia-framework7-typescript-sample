import { Index } from './../pages/index/index';
import { filter, sortBy, reverse } from 'lodash';
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject, singleton } from 'aurelia-framework';
import * as moment from 'moment';

export interface IDataService {
    GetAllTenders(): Promise<ITenderResponse>;
    GetCurrentCategories(cats: string, search: string): Promise<ITenderCategories[]>
    GetClosedCategories(cats: string, search: string): Promise<ITenderCategories[]>
    GetAwardedCategories(cats: string, search: string): Promise<ITenderCategories[]>
    GetFutureCategories(cats: string, search: string): Promise<ITenderCategories[]>
    GetDataById(Id: number, cat: string): Promise<ITender>
}

@singleton()
@inject(HttpClient)
export class DataService implements IDataService {

    baseUrl: string = "https://tendersonline-mobile.nt.gov.au/json/syncreply/";

    constructor(
        public httpClient: HttpClient
    ) {
    };

    GetCurrentCategories(cats: string, search: string): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetCurrentData().then(response => {
                var output: ITenderCategories[] = this.splitByCategory(response.items, cats, search);
                output = this.sortCat(output, cats);
                for (let entry of output) {
                    entry.items = this.sortEnt(entry.items, cats);
                }
                accept(output);
            });
        });
        return promise;
    }

    GetClosedCategories(cats: string, search: string): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetClosedData().then(response => {
                var output: ITenderCategories[] = this.splitByCategory(response.items, cats, search);
                output = this.sortCat(output, cats);
                for (let entry of output) {
                    entry.items = this.sortEnt(entry.items, cats);
                }
                accept(output);
            });
        });
        return promise;
    }

    GetAwardedCategories(cats: string, search: string): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetAwardedData().then(response => {
                var output: ITenderCategories[] = this.splitByCategory(response.items, cats, search);
                output = this.sortCat(output, cats);
                for (let entry of output) {
                    entry.items = this.sortEnt(entry.items, cats);
                }
                accept(output);
            });
        });
        return promise;
    }

    GetFutureCategories(cats: string, search: string): Promise<ITenderCategories[]> {
        var promise = new Promise<ITenderCategories[]>((accept, reject) => {
            this.GetFutureData().then(response => {
                var output: ITenderCategories[] = this.splitByCategory(response.futureOpportunities, cats, search);
                output = this.sortCat(output, cats);
                for (let entry of output) {
                    entry.items = this.sortEnt(entry.items, cats);
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
        return this.httpClient.fetch(this.baseUrl + "futureList", {
            method: 'post'
        })
            .then<ITenderResponse>((response) => {
                return response.json();
            });
    }

    GetDataById(Id: number, cat: string): Promise<ITender> {
        var output: ITender;
        var promise = new Promise<ITender>((accept, reject) => {
            switch (cat) {
                case 'Current':
                    this.GetCurrentData().then(response => {
                        for (let entry of response.items) {
                            if (entry.rftId == Id) {
                                output = entry;
                                break;
                            }
                        }
                        accept(output);
                    });
                    break;
                case 'Closed':
                    this.GetClosedData().then(response => {
                        for (let entry of response.items) {
                            if (entry.rftId == Id) {
                                output = entry;
                                break;
                            }
                        }
                        accept(output);
                    });
                    break;
                case 'Awarded':
                    this.GetAwardedData().then(response => {
                        for (let entry of response.items) {
                            if (entry.rftId == Id) {
                                output = entry;
                                break;
                            }
                        }
                        accept(output);
                    });
                    break;
                case 'Future Opportunities':
                    this.GetFutureData().then(response => {
                        for (let entry of response.futureOpportunities) {
                            if (entry.ftoId == Id) {
                                output = entry;
                                break;
                            }
                        }
                        accept(output);
                    });
                    break;
            }
        });
        return promise;
    }

    GetClosingList(RFTId: number): Promise<IListResponse> {
        return this.httpClient.fetch(this.baseUrl + "closingList?RFTId=" + RFTId, {
            method: 'post'
        })
            .then<IListResponse>((response) => {
                return response.json();
            });
    }

    GetAwardedList(RFTId: number): Promise<IListResponse> {
        return this.httpClient.fetch(this.baseUrl + "awardedList?RFTId=" + RFTId, {
            method: 'post'
        })
            .then<IListResponse>((response) => {
                return response.json();
            });
    }

    GetListById(Id: number, cat: string): Promise<IListResponse> {
        var output: IListResponse;
        var promise = new Promise<IListResponse>((accept, reject) => {
            switch (cat) {
                case 'Current':
                    this.GetClosingList(Id).then(response => {
                        output = response;
                        output.closing = false;
                        accept(output);
                    });
                    break;
                case 'Closed':
                    this.GetClosingList(Id).then(response => {
                        output = response;
                        output.closing = true;
                        accept(output);
                    });
                    break;
                case 'Awarded':
                    this.GetAwardedList(Id).then(response => {
                        output = response;
                        accept(output);
                    });
                    break;
                case 'Future Opportunities':
                default:
                    break;
            }
        });
        return promise;
    }

    sortCat(input: ITenderCategories[], sort: string): ITenderCategories[] {
        switch (sort) {
            case 'rel':
            case 'clo':
            case 'awaDat':
            case 'exp': {
                var monthNames = {
                    "Jan": 1,
                    "Feb": 2,
                    "Mar": 3,
                    "Apr": 4,
                    "May": 5,
                    "Jun": 6,
                    "Jul": 7,
                    "Aug": 8,
                    "Sep": 9,
                    "Oct": 10,
                    "Nov": 11,
                    "Dec": 12
                };
                if (sort == 'rel' || sort == 'clo') {
                    return reverse(sortBy(input, i => (i.name.substr(i.name.length - 4) + monthNames[i.name.substring(0, 3)])));
                }
                return sortBy(input, i => (i.name.substr(i.name.length - 4) + monthNames[i.name.substring(0, 3)]));
            }
            case 'pri': {
                var prices = {
                    "$0 - $499,999": 1,
                    "$500,000 - $999,999": 2,
                    "$1,000,000 - $2,499,999": 3,
                    "$2,500,000 - $4,999,999": 4,
                    "$5,000,000 - $9,999,999": 5,
                    "$10,000,000 - $29,999,999": 6,
                };
                return sortBy(input, i => (prices[i.name]));
            }
            case 'req': {
                return reverse(sortBy(input, i => (i.name)));
            }
        }
        return sortBy(input, i => (i.name));
    }

    sortEnt(input: ITender[], sort: string): ITender[] {
        if (input[0].priceRange != undefined && (sort == 'cat' || sort == 'reg' || sort == 'age' || sort == 'exp')) {
            var prices = {
                "$0 - $499,999": 1,
                "$500,000 - $999,999": 2,
                "$1,000,000 - $2,499,999": 3,
                "$2,500,000 - $4,999,999": 4,
                "$5,000,000 - $9,999,999": 5,
                "$10,000,000 - $29,999,999": 6,
            };
            return sortBy(input, i => (prices[i.priceRange]));
        } else if (sort == 'nam') {
            return sortBy(input, i => (i.title));
        } else if (input[0].rftNumber != undefined) {
            return sortBy(input, i => (i.rftNumber));
        } else {
            var monthNames = {
                "January": 1,
                "February": 2,
                "March": 3,
                "April": 4,
                "May": 5,
                "June": 6,
                "July": 7,
                "August": 8,
                "September": 9,
                "October": 10,
                "November": 11,
                "December": 12
            };
            return sortBy(input, i => (monthNames[i.expectedReleaseMonth]));
        }
    }


    splitByCategory(input: ITender[], sort: string, search: string): ITenderCategories[] {
        var output: ITenderCategories[] = [];
        var isSearch = (search != '' && search != undefined) ? true : false;
        
        for (let entry of input) {
            if (isSearch) {
                if (entry.title.toLowerCase().indexOf(search.toLowerCase())==-1) {
                    continue;
                }
            }
            switch (sort) {
                case 'nam':
                case 'none': {
                    output.push({ "name": null, "items": input });
                    return output;
                }
                case 'age': {
                    var cat = entry.agency;
                    break;
                }
                case 'reg': {
                    if (entry.workRegions !== undefined) {
                        var cat = entry.workRegions[0];
                    } else {
                        var cat = entry.rftWorkRegions[0];
                    }
                    break;
                }
                case 'cat': {
                    var cat = entry.category;
                    break;
                }
                case 'req': {
                    var n = entry.itemType.split(" ");
                    var cat = n[n.length - 1] + "s";
                    break;
                }
                case 'rel': {
                    var cat = moment(entry.releaseDate).format('MMMM YYYY');
                    break;
                }
                case 'clo': {
                    var cat = moment(entry.closeDate).format('MMMM YYYY');
                    break;
                }
                case 'awaStat': {
                    var cat = (entry.isTenderCancelled ? 'Cancelled' : 'Awarded');
                    break;
                }
                case 'awaDat': {
                    var cat = moment(entry.awardDate).format('MMMM YYYY');
                    break;
                }
                case 'pri': {
                    var cat = entry.priceRange;
                    break;
                }
                case 'exp': {
                    var cat = moment(entry.expectedReleaseDate).format('MMMM YYYY');
                    break;
                }
                default: {
                    alert("Somthing went wrong sorting.")
                    break;
                }
            }
            if (output.length > 0) {
                for (let category of output) {
                    if (cat === category.name) {
                        category.items.push(entry);
                        break;
                    } else if (category.name === (output[(output.length - 1)].name)) {
                        output.push({ "name": cat, "items": [entry] });
                        break;
                    }
                }
            } else {
                output.push({ "name": cat, "items": [entry] });
            }
        }
        return output;
    }
}