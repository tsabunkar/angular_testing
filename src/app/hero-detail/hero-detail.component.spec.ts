import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
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



    // !Testing Asynchronous code
    // this code will pass sometime and fail sometime bcoz of race condition
    xit('should call updateHero() func when save() is called', () => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled(); // check weather updateHero() func is called
        }, 300);

    });

    it('should call updateHero() func when save() is called, -> done', (done) => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled(); // check weather updateHero() func is called
            done();
        }, 300); // 300ms(millisecond)

    });

    // Alternative way of above code using fakeAsync()
    it('should call updateHero() func when save() is called, -> fakeAsync()', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        tick(250); // passing 250milliseconds in tick() func, this func- which will fast forward 250ms

        expect(mockHeroService.updateHero).toHaveBeenCalled(); // check weather updateHero() func is called
    })
    );

    // What if we dont know the time we need to tick forward, then use flush()
    it('should call updateHero() func when save() is called, -> flush()', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        flush(); // clock forward the number of milliseconds which we dont know

        expect(mockHeroService.updateHero).toHaveBeenCalled(); // check weather updateHero() func is called
    })
    );

    // Alternative way of doing above code
    it('should call updateHero() func when save() is called, -> async()', async(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save2();

        fixture.whenStable() // this whenStable() func will be called when all promises r resolved (i.e- either resolved or rejected)
            .then(() => {
                expect(mockHeroService.updateHero).toHaveBeenCalled(); // check weather updateHero() func is called
            });


    })
    );

    // !Note - If u have async code as- setTimeout(), debounce() func then use -> fakeAsync
    // !but if u have async code as- Promise() then use -> async-await




});


