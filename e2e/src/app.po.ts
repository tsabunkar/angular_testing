import { browser, by, element, $$ } from 'protractor';

// ! This file is called - page object (app.po.ts)
// !In this page object file we write all the functions which we expecting our application to have/behave
export class AppPage {

  // !note: all this function must return promise or element
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getDashboardButton() {
    return element(by.css('[routerlink="/dashboard"]'));
  }

  getHeoresButton() {
    return element(by.css('[routerlink="/heroes"]'));
  }

  getHeroesPageText() {
    return element(by.css('app-heroes h2')).getText();
  }

  navigateToHeroes() {
    return browser.get('/heroes');
  }

  // !Enterting value inside the input text box
  sendValueInsideInputElement() {
    // locating element using xpath ->
    return element(by.xpath('/html/body/app-root/app-heroes/div/label/input')).sendKeys('Batman');

    // to get xpath of an element > f12 > Inspect Elemet > select element >
    // right click that element (in Element window) -> Copy -> Copy XPath

  }

  // !checking the entered input text value inside the text box is correct
  getValueInsideInputElement() {
    // locating element using css ->
    return element(by.css('app-heroes div label input')).getAttribute('value');
  }

  getAddButton() {
    return element(by.xpath('/html/body/app-root/app-heroes/div/button'));
  }

  findLatestAddedElementInTheListOfHeroes() {

    const lastLiElement = element.all(by.xpath('/html/body/app-root/app-heroes/ul/li')).last();
    return lastLiElement.getText();

  }

}
