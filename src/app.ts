import { Framework7Engine } from 'aurelia-framework7-typescript';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import '../style/app-styles.scss';

@inject(Framework7Engine,EventAggregator)
export class App {
  
  views:AppView[];

  constructor (private f7:Framework7Engine, private ea:EventAggregator) {
    this.views = [
    {
      name: 'no-nav',
      moduleId: './pages/no-nav/no-nav',
      nav: false
    },
    {
      name: 'normal-page',
      navTitle: 'Normal Page',
      moduleId: './pages/normal-page/normal-page',
      nav: true
    },
    {
      name: 'index',
      navTitle: 'Home',
      moduleId: './pages/index/index',
      nav: true,
      homepage:true,
    },
    {
      name: 'page-outline',
      navTitle: 'Page Outline',
      moduleId: './pages/page-outline/page-outline',
      nav: false
    },
    {
      name: 'my-businesses',
      navTitle: 'My Businesses',
      moduleId: './pages/my-businesses/my-businesses',
      nav: true,
    },
    {
      name: 'my-account',
      navTitle: 'My Account',
      moduleId: './pages/my-account/my-account',
      nav: true,
    },
    {
      name: 'sign-in',
      navTitle: 'Sign In',
      moduleId: './pages/sign-in/sign-in',
      nav: true,
      homepage:true,
    },
    {
      name: 'future-opportunities',
      navTitle: 'Future Opportunities',
      moduleId: './pages/future-opportunities/future-opportunities',
      nav: true,
      homepage:true,
    },
    {
      name: 'awarded',
      navTitle: 'Awarded',
      moduleId: './pages/awarded/awarded',
      nav: true,
      homepage:true,
    },
    {
      name: 'closed',
      navTitle: 'Closed',
      moduleId: './pages/closed/closed',
      nav: true,
      homepage:true,
    },
    {
      name: 'current',
      navTitle: 'Current',
      moduleId: './pages/current/current',
      nav: true,
      homepage:true,
    }]
  }

  attached () {
   
    this.f7.setUpFramework7();
    
  }
}
