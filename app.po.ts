import { browser, element, by, Key } from 'protractor';


export class TestPage {
  public userIdInputElm = element(by.css('#email'))
  public passwordInputElm = element(by.css('#password'))
  public signinButtonElm = element(by.css('#next'));

  navigateTo() {
    return browser.get('/');
  }

  isMicrosoftAzureLoginLandingPage() {
    return element(by.css('.main-container'));
  }

  getParagraphText() {
    return element(by.css('app-root')).getText();
  }

  getAppHederMenuElements() {
    return element.all(by.css('.navbar-header'));
  }

  getAllAppHederMenuElements() {
    let menu  = element.all(by.css('a'));
    return menu.count;
  }

  getAppFooterMenuElements() {
    return element.all(by.css('.navbar-footer'));
  }

  getAllAppFooterMenuElements() {
    let menu  = element.all(by.css('a'));
    return menu.count;
  }

  getAllMenuElements() {
    let urls = [];
    return element.all(by.css('a')).then(function (links) {
      links.forEach(function (link) {
        link.getAttribute('href').then(function (href) {
          urls.push(href);
        });
      });

      // wait for all the links to be grabbed
      browser.waitForAngular().then( async function () {
        await urls.forEach(function (url) {
            //browser.switchTo().alert().accept();
            browser.get(url);
          // checkBrowserState();
        });
      });
    });
  }
}
