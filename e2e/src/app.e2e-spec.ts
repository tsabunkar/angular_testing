import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

// !Here we do e2e testing by executing it() inside describe()
describe('e2e testing App', () => {
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

  // !Altrenatively
  it('should have test as Tour of Heroes in h1 tag (Altrenative)', () => {
    browser.get('http://localhost:4200/dashboard');
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

  it('should enter value inside the input text box', () => {
    page.navigateToHeroes();

    page.sendValueInsideInputElement();

    browser.sleep(3000);

    expect(page.getValueInsideInputElement()).toEqual('Batman');
  });

  it('should add new hero in list when add btn is click on entering text value in input', () => {
    page.navigateToHeroes();

    page.sendValueInsideInputElement(); // value is entered inside input text box

    browser.sleep(2000);

    page.getAddButton().click(); // add button is clicked

    browser.sleep(2000);

    page.findLatestAddedElementInTheListOfHeroes() // check latest added li element text content matched with Batman
      .then((liText_Array) => {
        const idAndNameElements = liText_Array.split('\n');
        const nameElements = idAndNameElements[0].split(' ');
        const requiredNameInLiElement = nameElements[nameElements.length - 1];
        expect(requiredNameInLiElement).toEqual('Batman');
      });

  });


});
