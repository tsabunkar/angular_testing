import { browser, by, element } from 'protractor';

// ! This file is called - page object (app.po.ts)
// !In this page object file we write all the functions which we expecting our application to have/behave
export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  /* <nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
</nav> */
  getDashboardButton() {
    return element(by.css('[routerlink="/dashboard"]'));
  }

  getHeoresButton() {
    return element(by.css('[routerlink="/heroes"]'));
  }

  getHeroesPageText() {
    return element(by.css('app-heroes h2')).getText();
  }

}
