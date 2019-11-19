import {browser, element, by, protractor} from 'protractor';

export class LoginPage {
  public EC = protractor.ExpectedConditions;

  get usernameLabel() {
    return element(by.css('.login-field:nth-child(1) label'));
  }

  get username() {
    return element(by.id('logonIdentifier'));
  }

  get passwordLabel() {
    return element(by.css('.login-field:nth-child(2) label'));
  }

  get password() {
    return element(by.id('password'));
  }

  get errorMessage() {
    return element(by.css('.highlightError'));
  }

  get signIn() {
    return element(by.id('next'));
  }

  shouldHaveForgetPasswordLink() {

  }

  async trySignIn(username?: string, password?: string) {
    this.username.clear();
    await this.username.sendKeys(username);
    this.password.clear();
    await this.password.sendKeys(password);
    this.signIn.click();

  }
}
