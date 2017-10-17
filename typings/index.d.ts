
/// <reference path="./models.d.ts" />


declare var PLATFORM:string;
declare var PRODUCTION:boolean;

declare interface AppView{
    name:string;
    moduleId:string;
    nav:boolean;
    navTitle?:string;
    homepage?:boolean;
}