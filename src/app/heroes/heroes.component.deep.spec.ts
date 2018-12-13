import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';


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
                HeroComponent
            ],
            providers: [
                // !if provide heroeService then we r making backend api call
                // HeroService,
                // ! so use below technique, if some1 ask for heroService instead u provide MockService (i.e-mockHeroService)
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

    });



    it('should render each hero as HeroComponent in Template', () => {

        // when getHeroes() function is called we should return Mock heroes sample data - HEROES_SAMPLE_DATA
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));

        // calling Angular change detection
        // this change dection wil run on HeroesComponent (i.e- Parent Component) and also on all its child Component (i.e-Child Component)
        fixture.autoDetectChanges(); // run ngOnInit()


    });

});

