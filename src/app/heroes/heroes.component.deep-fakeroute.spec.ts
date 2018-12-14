import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, DebugElement, Directive, Input } from '@angular/core';
import { By } from '@angular/platform-browser';


// !Creating Fake Directive attribute for [routerLink]
/* tslint:disable */  // ignoring ts-lint errors (all below line of code is ignored for linting)
@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' } // listen to click event on DOM node
})
export class MockRouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}
/* tslint:enable */  // allowing ts-lint errors
describe('Deep Testing for Heroes Component', () => {


    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService; // creating mocking Service instead of using HeroService
    let HEROES_SAMPLE_DATA;


    beforeEach(() => {

        HEROES_SAMPLE_DATA = [
            { id: 1, name: 'Hulk', strength: 5 },
            { id: 2, name: 'Thor', strength: 4 },
            { id: 3, name: 'Black Panther', strength: 3 },
        ];


        // Creating spy methods and giving it to mockHeroService (Instead of using heroService)
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                // *Since it is Deep Integration, instead of creating Mock/fake child component of HeroComponent as used to do
                // *in Shallow Integration test we r actually declaring childComponent (ie-HeroComponent) in this HeroesComponent
                HeroComponent,
                MockRouterLinkDirectiveStub
            ],
            providers: [
                // !if provide heroeService then we r making backend api call
                // HeroService,
                // ! so use below technique, if some1 ask for heroService instead u provide MockService (i.e-mockHeroService)
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
            // ! commenting NO_ERRORS_SCHEMA will fail test bcoz routerLink is not know attribute in HeroComponent
            // !(which is child compo of HeroesComponent), so we will be creating mock/fake routerLink (check above code in line:10)
        });

        fixture = TestBed.createComponent(HeroesComponent);

    });



    it('should render each hero as HeroComponent in Template (length is 3)', () => {

        // when getHeroes() function is called we should return Mock heroes sample data - HEROES_SAMPLE_DATA
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));

        // calling Angular change detection
        // this change dection wil run on HeroesComponent (i.e- Parent Component) and also on all its child Component (i.e-Child Component)
        fixture.detectChanges(); // !run ngOnInit()

        // queryAll -return list/array of items
        // find/query all the elements/node in DOM tree whose element directive is -> <app-hero>
        // (i.e- HeroComponent) check in heroes.comp.html
        const heroComponentDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDebugElements.length).toEqual(3);

    });

    it('should render each hero as HeroComponent in Template', () => {

        // when getHeroes() function is called we should return Mock heroes sample data - HEROES_SAMPLE_DATA
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));

        // calling Angular change detection
        // this change dection wil run on HeroesComponent (i.e- Parent Component) and also on all its child Component (i.e-Child Component)
        fixture.detectChanges(); // !run ngOnInit()

        // queryAll -return list/array of items
        // find/query all the elements/node in DOM tree whose element directive is -> <app-hero>
        // (i.e- HeroComponent) check in heroes.comp.html
        const heroComponentDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDebugElements[0].componentInstance.hero.name).not.toEqual('hulk');
        expect(heroComponentDebugElements[0].componentInstance.hero.name).toEqual('Hulk');

        // checking all hero component item with SAMPLE_DATA
        for (let index = 0; index < heroComponentDebugElements.length; index++) {
            expect(heroComponentDebugElements[index].componentInstance.hero).toEqual(HEROES_SAMPLE_DATA[index]);
        }


    });

    // !Delete an item, child component(HeroCompo) emit event and data is transfered to parent component
    // !(HeroesComp) thus writing test case for this scenario
    it('should call heroSerivce.deleteHero() when Hero Comps delete btn is clicked', () => {


        // check weather deleteHeroComp() method is called (heroes.compo.ts)
        spyOn(fixture.componentInstance, 'deleteHeroComp');

        // mochHeroService has sample/mock data
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // angular change detection
        fixture.detectChanges(); // !run ngOnInit()

        // <li> will have 3 child compon i.e - three <app-hero> bcoz- *ngFor will create three sample/mock data
        let heroComponent: DebugElement[];
        heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // now one instance / one item of Hero componet will have template as - hero.component.html
        // but we interested on <button> element where event would be triggered from child to parent comp
        // <button class="delete" (click)="onDeleteClick($event)">x</button>
        // heroComponent[0] -> first element of arrray
        // query(By.css('button')) -> selecting button element
        // triggerEventHandler('click') -> will trigger button event (do click progrmmatically)

        heroComponent[0].query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => { } });

        // deleteHeroComp() method (heroes.compo.ts) is called with correct argument
        expect(fixture.componentInstance.deleteHeroComp).toHaveBeenCalledWith(HEROES_SAMPLE_DATA[0]);
    });

    // !Alternate way of doing -> Instead of clicking the delete button in tempalate of child comp
    // ! we can rather emit event from (.ts) file of child comp
    it('Alternate way of -should call heroSerivce.deleteHero() when Hero Comps delete btn is clicked', () => {


        // check weather deleteHeroComp() method is called (heroes.compo.ts)
        spyOn(fixture.componentInstance, 'deleteHeroComp');

        // mochHeroService has sample/mock data
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // angular change detection
        fixture.detectChanges(); // !run ngOnInit()

        // <li> will have 3 child compon i.e - three <app-hero> bcoz- *ngFor will create three sample/mock data
        let heroComponent: DebugElement[];
        heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

        (<HeroComponent>heroComponent[1].componentInstance).delete.emit(undefined);

        // deleteHeroComp() method (heroes.compo.ts) is called with correct argument
        expect(fixture.componentInstance.deleteHeroComp).toHaveBeenCalledWith(HEROES_SAMPLE_DATA[1]);
    });


    // !Alternative way of doing above code
    it('Alternate way of -should call heroSerivce.deleteHero() when Hero Comps delete btn is clicked', () => {


        // check weather deleteHeroComp() method is called (heroes.compo.ts)
        spyOn(fixture.componentInstance, 'deleteHeroComp');

        // mochHeroService has sample/mock data
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // angular change detection
        fixture.detectChanges(); // !run ngOnInit()

        // <li> will have 3 child compon i.e - three <app-hero> bcoz- *ngFor will create three sample/mock data
        let heroComponent: DebugElement[];
        heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // (<HeroComponent>heroComponent[1].componentInstance).delete.emit(undefined);
        heroComponent[2].triggerEventHandler('delete', undefined);

        // deleteHeroComp() method (heroes.compo.ts) is called with correct argument
        expect(fixture.componentInstance.deleteHeroComp).toHaveBeenCalledWith(HEROES_SAMPLE_DATA[2]);
    });

    // !putting value into the input text box and checking wheather integration of template to (.ts)
    // !file is happening properly
    it('should add a new hero to the hero list when value is eneterd inside input text box and add btn is clicked', () => {

        // mochHeroService has sample/mock data
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // angular change detection
        fixture.detectChanges(); // !run ngOnInit()
        const name = 'Flash';
        const toBeAddedHeroObject = {
            id: 5,
            name,
            strength: 4
        };
        mockHeroService.addHero.and.returnValue(of(toBeAddedHeroObject));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.value = name; // mock_value is assigned inside the input text box of heroes.comp.html

        // const addButton = fixture.debugElement.query(By.css('button')); // there r many buttons
        // but if use query() method it will select/return us only first button
        // or we can do -
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
        addButton.triggerEventHandler('click', undefined); // click btn evwnt is triggered which will call add() method (heroes.com.ts)

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });


    it('should have the correct route for the first hero', () => {
        // mochHeroService has sample/mock data
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // angular change detection
        fixture.detectChanges(); // !run ngOnInit()

        const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

        const routerLink = heroComponent[0].query(By.directive(MockRouterLinkDirectiveStub))
            .injector.get(MockRouterLinkDirectiveStub);

        heroComponent[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    });

});

