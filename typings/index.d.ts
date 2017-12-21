
/// <reference path="./models.d.ts" />

declare interface AppView{
    name:string;
    moduleId:string;
    nav:boolean;
    navTitle?:string;
    homepage?:boolean;
}

declare interface ITenderCategories{
    name:string;
    items:ITender[]
}

declare interface ITenderResponse {
    items:ITender[];
    count:number;
}

declare interface ITender {
    rftId: number;
    rftNumber: string;
    title: string;
    agency: string;
    itemType: string;
    closeDate: string;
    releaseDate: string;
    contractNo: string;
    rftAvailableLodgementMethod?: (string)[] | null;
    technicalEnquiriesPhone: string;
    furtherEnquiries?: (string)[] | null;
    paperDocumentsAvailable: boolean;
    rftPaperDocumentsAvailableFromRegion?: (string)[] | null;
    category: string;
    rftWorkRegions?: (string)[] | null;
    closingRegion: string;
    calAccreditationRequired: boolean;
    isTenderCancelled: boolean;
    siteInspectionDetails: string;
    industryBriefingDetails: string;
}
  
// declare interface IListEntry{
//     type:string;
//     ID:number;
//     NavName:string;
//     Department:string;
//     JobID:string;
//     Date?:string;
//     Description:string;
//     CloseDate?:string;
//     ClosingRegion?:string;
//     PriceRange?:string;
//     ProjectOfficer?:string;
//     LodgementMethods?:string;
//     GeneralEnquiries?:string;
//     TechnicalEnquiries?:string;
//     FurtherEnquiries?:string;
//     Category:string;
//     RegionsOfWork:string;
//     CalAccreditation?:boolean;
//     SiteInspection?:string;
//     IndustryBriefing?:string;
//     ProspectiveTenderers?:string[];
//     ClosingList?:string[];
//     AwardedContractor?:string;
//     AwardedValue?:string;
//     BasisOfPayment?:string;
// }