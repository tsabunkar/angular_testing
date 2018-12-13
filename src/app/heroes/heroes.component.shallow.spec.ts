import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('Shallow testing for Heroes component', () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService; // creating mocking Service instead of using HeroService
    let HEROES_SAMPLE_DATA;

    // !Mocking HeroComponent which is child component of this HeroesComponent
    // !and not using -> NO_ERRORS_SCHEMA
    // *------Mocking Child Compoent of HeroesComponent------
    @Component({
        selector: 'app-hero',
        template: '<div></div>'
    })
    class MockHeroComponent {
        @Input() hero: Hero;

    }
    // *-----------------------------------------------------


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
                MockHeroComponent
            ],
            providers: [
                // !if provide heroeService then we r making backend api call
                // HeroService,
                // ! so use below technique, if some1 ask for heroService instead u provide MockService (i.e-mockHeroService)
                { provide: HeroService, useValue: mockHeroService }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });


    // ! Mocking Injected Service (HeroService)
    it('should getHeroes correctly from mockService and length is 3', () => {

        // mockHeroService has Sample data in it
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // calling angular change detector, bcoz we require ngOnit() hook to getAll heroes item/data
        fixture.autoDetectChanges();
        // executing expect() function
        expect(fixture.componentInstance.heroes.length).toBe(3);

    });

    // !Shallow Ingreation Test [for <li>] -> <li *ngFor="let hero of heroes">
    it('should create one li for each hero', () => {
        // mockHeroService has Sample data in it
        mockHeroService.getHeroes.and.returnValue(of(HEROES_SAMPLE_DATA));
        // calling angular change detector, bcoz we require ngOnit() hook to getAll heroes item/data
        fixture.autoDetectChanges();


        // queryAll() will select all the li elements
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });


});

