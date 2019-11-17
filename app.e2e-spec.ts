import { TestPage } from './app.po';
import { LoginPage } from "./login.po";
import { browser, element, by, protractor } from 'protractor';
import { DashboardPage } from './dashboard.po';

describe('cribs.test App', () => {
  let page: TestPage;
  let login: LoginPage;
  let dashboard: DashboardPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new TestPage();
    login = new LoginPage();
    dashboard = new DashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeTruthy();
  });

  it('should Navigate to Mircosoft Azure for Client Login Request ', () => {
    //    page.navigateTo();
    browser.controlFlow().execute(function () {
      browser.ignoreSynchronization = true;
    });
    browser.driver.get('https://haysonlinedev.b2clogin.com/haysonlinedev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_WSP_SignIn&client_id=2a76f224-fe13-410a-9f90-3df3a8aacf14&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fworkspacetest.hays.co.uk&scope=openid&response_type=id_token')
    browser.sleep(3000);

  });

  it('should have Mircosoft Azure for Client Login Page ', () => {
    browser.controlFlow().execute(function () {
      browser.ignoreSynchronization = true;
    });
    expect(page.isMicrosoftAzureLoginLandingPage()).toBeTruthy();
    browser.sleep(3000);
  });

  it('should display an error message to the user if they provided incorrect credentials', () => {
    browser.waitForAngularEnabled(false);
    login.trySignIn('123', '123');
    browser.wait(EC.visibilityOf(login.errorMessage));
    return login.errorMessage.getText().then(txt => {
      expect(txt).toBe("Please enter a valid email address");
    });
  });


  it('should be able to login', async function () {
    const username = element(by.css('#logonIdentifier'));
    username.clear();
    await username.sendKeys('dhruv.arora@hays.com');
    const passwordInputElm = element(by.css('#password'));
    passwordInputElm.clear();
    await passwordInputElm.sendKeys('WSPpass123');
    const signinButtonElm = element(by.css('#next'));
    await signinButtonElm.click();
    //    browser.waitForAngularEnabled(true);
    await browser.wait(EC.visibilityOf(element(by.css('.page'))));
    await expect(element(by.css('.page')).isPresent()).toBeTruthy();
  })

  it('should redirect the user to the dashboard page if they provided correct credentials..', async function () {
    browser.wait(() => {
      browser.controlFlow().execute(function () {
        browser.ignoreSynchronization = false;
      });
    }, 5000);
    await browser.wait(EC.visibilityOf(element(by.css('.page'))));
    await expect(dashboard.dashboardPageExist.isPresent()).toBeTruthy();
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
