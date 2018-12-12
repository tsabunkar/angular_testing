import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroComponent (doing Shallow Test of Complete HeroComponent)', () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // testbed allows use to test a components (both .ts and html file) running together
        TestBed.configureTestingModule({ // configureTestingModule -> creating the testing module for this decribe block
            declarations: [ // Component which we need to shallow integration test
                HeroComponent,
                // should not import routing module, so use schemas
            ],
            // schemas is used to -> this property will tell angular dont throw any error for unknow attribute
            // or unknown element which is present in html file, but it is not recommended way
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent); // createComponent -> Creating the component
        // createComponent-> return type is ComponentFixture<HeroComponent>, ComponentFixture - is wrapper for
        // component, this wrapper has many properties which helps for testing
    });

    // !Testing only .ts file of the HeroComponent (Isolated test)
    it('should have correct hero property (which is coming from parent component using @Input()', () => {
        fixture.componentInstance.hero = {
            id: 1,
            name: 'Superman',
            strength: 3
        };
        // fixture.componentInstance -> gives Instances of HeroComponent
        expect(fixture.componentInstance.hero.name).toEqual('Superman');
    });


    // !Testing integration of both .html and .ts file of the HeroComponent (Shallow integration test)
    it('should render {{hero.name}} inside anchor tag in template', () => {

        fixture.componentInstance.hero = {
            id: 1,
            name: 'batman',
            strength: 4
        };
        fixture.detectChanges(); // this will tell angular to run change detection and update any binding which
        // exist on method or propety

        // nativeElement-> using this prop We can get access on the DOM of the HeroComponent
        // querySelector() to access any html element inside that DOM
        // textContext -> gives innerHtml of the html element
        /* console.log('----');
        console.log(fixture.debugElement.nativeElement.querySelector('a').textContent);
        console.log(fixture.debugElement.nativeElement.querySelector('a').innerHTML);
        console.log('----'); */

        // expect(fixture.debugElement.nativeElement.querySelector('a').textContext).toContain('1 batman');

        expect(fixture.debugElement.nativeElement.querySelector('a').textContent)
            .toContain('1 batman');
    });


    it('should render innerHtml of anchor tag in template', () => {

        fixture.componentInstance.hero = {
            id: 1,
            name: 'batman',
            strength: 4
        };
        fixture.detectChanges(); // this will tell angular to run change detection and update any binding which
        // exist on method or propety

        expect(fixture.debugElement.nativeElement.querySelector('a').innerHTML)
            .toContain('<span _ngcontent-c2="" class="badge">1</span> batman');
    });



});


