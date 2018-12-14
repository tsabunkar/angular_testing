import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


// !testing Routing is happening properly (i.e- mockingActivatedRoutes, routerLink, etc)
describe('HeroesDetailComponent, testing routing is happening prply', () => {

    // creating mocks of   private route: ActivatedRoute, private heroService: HeroService, private location: Location
    let mockHeroService;
    let mocklocation;
    let mockActivatedRoute;
    let fixture: ComponentFixture<HeroDetailComponent>;

    beforeEach(() => {
        // mocking methods used by HeroService here-
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mocklocation = jasmine.createSpyObj(['back']);

        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => {
                        return '3';
                    }
                }
            }
        };


        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Location, useValue: mocklocation }, // Location imported - '@angular/common'
                { provide: HeroService, useValue: mockHeroService },
            ],
            imports: [FormsModule]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperWoman', strength: 3 }));

    });

    it('should render hero name in <h2> tag', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('SUPERWOMAN Details');
        // (or)
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERWOMAN Details');
    });


});


