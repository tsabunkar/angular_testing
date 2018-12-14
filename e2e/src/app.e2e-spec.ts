import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

// !Here we do e2e testing by executing it() inside describe()
describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage(); // instance of page object so that we can access all the func created there
  });

  it('should navigate to "http://localhost:4200/dashboard" ', () => {
    page.navigateTo(); // calling navigateTo() func
    // browser.pause(); // pause the browser while performing e2e testing
    expect(page).toBeTruthy();
  });

  it('should have test as Tour of Heroes in h1 tag ', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });

  it('should display Dashboard button and Heores Button inside nav tag', () => {
    page.navigateTo();
    expect(page.getDashboardButton().getText()).toEqual('Dashboard');
    expect(page.getHeoresButton().getText()).toEqual('Heroes');
  });

  it('should navigate/route to heroes when Heores button is clicked and h2 tag should have text as My Heroes', () => {
    page.navigateTo();
    page.getHeoresButton().click();
    browser.sleep(3000); // delay the browser speed by making it going to sleep
    // browser.pause();
    expect(page.getHeroesPageText()).toEqual('My Heroes');
  });




});
