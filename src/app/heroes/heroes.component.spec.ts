import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('Test case for Heroes Component', () => {
    let heroesComponent: HeroesComponent;
    let HEROES_ARRAY;
    let mockHeroesService;

    beforeEach(() => {
        HEROES_ARRAY = [
            { id: 1, name: 'Tejas', strength: 6 },
            { id: 2, name: 'Usha', strength: 100 },
            { id: 3, name: 'Shailesh', strength: 15 },
            { id: 4, name: 'Ram', strength: 25 },
        ];

        // createSpyObj() pass array of method name which we r tying to mock/spy
        // these r mock method names as present in service (hero.service.ts)
        mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        heroesComponent = new HeroesComponent(mockHeroesService); // expecting heroesService which will
        // make a http call to backend , which we should not do
        // rather we can mock this service behaviour by using jasime createSpyObj() func

    });

    it('should have HEROES_ARRAY length as 4', () => {
        heroesComponent.heroes = HEROES_ARRAY;
        expect(heroesComponent.heroes.length).toBe(4);
    });

    describe(' delete', () => {
        it('should remove the hero from the heroes array/list', () => {
            // below line we not written we get error- Cannot read property 'subscribe' of undefined
            // this is bcoz deleteHero() func returns Observable which is been subcribed in HeroComoponent
            // whereas, below deleteHero() func is a mock func, which should return Observable type
            // thus simplist way to create Observable is using of() operator provided by RxJS
            // therefore below deleteHero() returnsValue of type Observable [we r not bothered about data]
            mockHeroesService.deleteHero.and.returnValue(of(true));

            heroesComponent.heroes = HEROES_ARRAY;
            heroesComponent.delete(HEROES_ARRAY[3]); // removing 3 element from the array
            expect(heroesComponent.heroes.length).toBe(3);

        });

        // xit() -> commenting/skipping unit test case to run in karma
        it('should call deleteHero() func present in HeroService', () => {
            mockHeroesService.deleteHero.and.returnValue(of(true));

            heroesComponent.heroes = HEROES_ARRAY; // is similar to  heroesComponent.ngOnInit(); bcoz we r
            // initializing the heroes array in onInit also here we r doing manually

            heroesComponent.delete(HEROES_ARRAY[3]); // removing 3 element from the array
            expect(mockHeroesService.deleteHero).toHaveBeenCalled(); // checks weather deleteHero() func is called/invoked
        });

        it('should call deleteHero() func present in HeroService, whose i/p method argument is Object which we r deleting', () => {
            mockHeroesService.deleteHero.and.returnValue(of(true));

            heroesComponent.heroes = HEROES_ARRAY;
            heroesComponent.delete(HEROES_ARRAY[3]);
            expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(HEROES_ARRAY[3]);
        });

    });

});
