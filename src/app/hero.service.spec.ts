import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Integration testing of service with Http Calls', () => {

    let mockMessageService: MessageService; // check the constructor heroService it require messageService and httpCLientModule
    // httpClientModule will be provide by angular(HttpClientTestingModule) but we r mocking MessageService

    let httpTestingController: HttpTestingController;
    let heroService: HeroService;


    beforeEach(async () => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController); // technique to handle a service
        // for ex- to get HeroService we can do perform technique
        heroService = TestBed.get(HeroService);

    });

    it('should create service', () => {
        expect(true).toEqual(true);
    });



    // ! Using inject() function as argument inside it() to get Service Instance
    // inject() - takes two argum- first is list of dependencies or Service we want
    // second is callback function where we assign that Service to a variable

    it('should test -> GET by Id [i.e-getHeroes()]',
        inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {

            service.getHero(4).subscribe(() => {
                console.log('This http GET request is full filled');
            }); // we r not actually Making a backend http Get Call rather
            // angulars - HttpTestingController will mock/fake this get call

            const httpRequest = controller.expectOne('api/heroes/4');
            httpRequest.flush({ // response for the GET http request call - 'api/heroes/4'
                id: 4,
                name: 'IronMan',
                strength: 5
            });
            controller.verify(); // verifying no multiples http requests r made
        }));



    // ! Alternative way is- without using inject() function as argument inside it(), but rather to get services instance from
    // ! TestBed.get() function as did in beforeEach() function
    it('should test -> GET by Id [i.e-getHeroes()]', () => {

        heroService.getHero(4).subscribe(() => {
            console.log('This http GET request is full filled');
        }); // we r not actually Making a backend http Get Call rather
        // angulars - HttpTestingController will mock/fake this get call

        const httpRequest = httpTestingController.expectOne('api/heroes/4');
        httpRequest.flush({ // response for the GET http request call - 'api/heroes/4'
            id: 4,
            name: 'IronMan',
            strength: 5
        });
        httpTestingController.verify(); // verifying no multiples http requests r made
    });


});
