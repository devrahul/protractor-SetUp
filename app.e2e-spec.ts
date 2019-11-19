import { TestPage } from './app.po';
import { LoginPage } from './login.po';
import { browser, element, by, protractor } from 'protractor';
import { DashboardPage } from './dashboard.po';

describe('User Login with Case when : ', () => {
  let page: TestPage;
  let login: LoginPage;
  let dashboard : DashboardPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new TestPage();
    login = new LoginPage();
    dashboard = new DashboardPage();
  });

  /*it(' display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeTruthy();
  });*/

  it(' Navigate to Mircosoft Azure for Client Login Request ', () => {
//    page.navigateTo();
    browser.controlFlow().execute(function () {
      browser.ignoreSynchronization = true;
    });
    browser.driver.get('https://haysonlinedev.b2clogin.com/haysonlinedev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_WSP_SignIn&client_id=2a76f224-fe13-410a-9f90-3df3a8aacf14&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fworkspacetest.hays.co.uk&scope=openid&response_type=id_token')
    browser.sleep(3000);

  });

  it(' have Mircosoft Azure for Client Login Page ', () => {
    browser.controlFlow().execute(function () {
      browser.ignoreSynchronization = true;
    });
    expect(page.isMicrosoftAzureLoginLandingPage()).toBeTruthy();
    browser.sleep(3000);
  });

  it(' display an error message to the user when no username and password given', async () => {
    
    await login.trySignIn('', '');
    browser.wait(EC.visibilityOf(login.errorMessage));
    await login.errorMessage.getText().then(txt => {
      expect(txt).toBe('Please enter your email');
    });
  });

  /* it(' display an error message to user when invalid username given',  () => {    
    login.trySignIn('test@', '');
    browser.wait(EC.visibilityOf(login.errorMessage));
     login.errorMessage.getText().then(txt => {
     expect(txt).toBe('Please enter a valid email address');
    });
  });

   it(' display an error message to the user when Correct username/email given',  () => {
    login.trySignIn('test@gmail.com', '');
    browser.wait(EC.visibilityOf(login.errorMessage));
     login.errorMessage.getText().then(txt => {
      expect(txt).toBe('Please enter your password');
    });
  });


   it(' display an error message to the user when password is given',  () => {
   login.trySignIn('', '123');
    browser.wait(EC.visibilityOf(login.errorMessage));
     login.errorMessage.getText().then(txt => {
      expect(txt).toBe('Please enter your email');
    });
  });*/

   it(' display an error message to the user if they provided incorrect credentials', () => {
    login.trySignIn('123', '123');
    browser.wait(EC.visibilityOf(login.errorMessage));
    return login.errorMessage.getText().then(txt => {
      expect(txt).toBe('Please enter a valid email address');
    });
  }); 


  it(' be able to login', async function () {
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

  it('redirect the user to the dashboard page if they provided correct credentials..', async function () {
    browser.waitForAngularEnabled(true);
    await browser.wait(EC.visibilityOf(element(by.css('.page'))));
    await expect(dashboard.dashboardPageExist.isPresent()).toBeTruthy();
  });

  /*
  browser.controlFlow().execute(function() {
      browser.ignoreSynchronization = true;
    });
    */
  it(' display a list of header menu', () => {
    expect(page.getAppHederMenuElements()).toBeTruthy();
  });


  it(' display a list of footer menu', () => {
    expect(page.getAppFooterMenuElements()).toBeTruthy();
  });

  it(' check all header menu', async () => {
    expect(await page.getAllMenuElements()).toBeTruthy();
  });



});
