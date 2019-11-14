import { TestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('cribs.test App', () => {
  let page: TestPage;

  beforeEach(() => {
    page = new TestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    //expect(page.containsElement('#welcome')).toBeTruthy();
    expect(page.getParagraphText()).toBeTruthy();
  });

  it('should Navigate to Mircosoft Azure for Client Login Request ', () => {
    page.navigateTo();
    browser.controlFlow().execute(function () {
      browser.ignoreSynchronization = true;
    });
    browser.driver.get('https://haysonlinedev.b2clogin.com/haysonlinedev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_WSP_SignIn&client_id=2a76f224-fe13-410a-9f90-3df3a8aacf14&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fworkspacetest.hays.co.uk&scope=openid&response_type=id_token')

  });

  it('should have Mircosoft Azure for Client Login Page ', () => {
    browser.controlFlow().execute(function () {
      browser.ignoreSynchronization = true;
    });
    expect(page.isMicrosoftAzureLoginLandingPage()).toBeTruthy();
    
  });

  it('should be able to login', function () {
    browser.wait( () => {
      page.userIdInputElm.clear();
      page.userIdInputElm.sendKeys('dhruv.arora@hays.com');
      page.passwordInputElm.clear();
      page.passwordInputElm.sendKeys('WSPpass123');  
    // expect(page.userIdInputElm).toBeTruthy();
    // expect(page.passwordInputElm).toBeTruthy();
    // expect(page.signinButtonElm).toBeTruthy();
    }, 15000);
    
    expect(page.signinButtonElm.click()).toBeTruthy();
  })



  it('Sign in ....', function () {
    browser.wait( () => {
      browser.controlFlow().execute(function() {
        browser.ignoreSynchronization = false;
      });
      return browser.isElementPresent(element(by.css('.page')))
    }, 30000)
  });

  it('Novw navigating to Hays Dashboard', function () {    
    expect(page.isMicrosoftAzureLoginLandingPage().isPresent()).toBeFalsy();
    expect(element(by.css(".ng-ts-0-0")).isPresent()).toBeTruthy();
  });




  /*
  browser.controlFlow().execute(function() {
      browser.ignoreSynchronization = true;
    });
  it('should display a list of header menu', () => {
    page.navigateTo();
    expect(page.getAppHederMenuElements()).toBeTruthy();
  });

  it('should display a list of footer menu', () => {
    page.navigateTo();
    expect(page.getAppHederMenuElements()).toBeTruthy();
  });

  it('should display total  of header menu', () => {
    page.navigateTo();
    expect(page.getAllAppHederMenuElements()).toBe(21);
  });

  it('should display a list of footer menu', () => {
    page.navigateTo();
    expect(page.getAppFooterMenuElements()).toBeTruthy();
  });

  it('should check all header menu', () => {
    page.navigateTo();
    expect(page.getAllMenuElements()).toBeTruthy();
  });

*/


});
