import {by, element} from 'protractor';

export class DashboardPage {
  get title() {
    return element(by.css('h1'));
  }

  get dashboardPageExist() {
    return element(by.css('.page'));
  }
}
