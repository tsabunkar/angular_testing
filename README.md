# AngularTesting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
=====================================================================================================
# Automated Testing -
<li>
Unit Testing
</li>
<li>
End to End Testing
</li>
<li>
Integration or functional Testing
</li>

# End To End Testing
This testing is done on Live running application.
We write test which execise/execute on live running application.

# Unit Testing
This test is write on single 'unit' of code.

# Integration or functional Testing
More than a unit testing, but less than the complete application.


=====================================================================================================
decribe('', () =>{

});

fdecribe('', () =>{

});

executes unit test case
it('', () =>{

});

does not executes unit test case
xit('', () =>{

});

=====================================================================================================
Code Coverage - 
tests that how much of your code is covered under unit testing (isolated/integration/e2e).
So, if you have 90% code coverage than it means there is 10% of code that is not covered under tests

to run code-coverage -
ng test --code-coverage

A new coverage folder will be created by angular > Goto Coverage > index.html (open this index.html file
in the chrome browser, where we can view the code-coverage report for all component) 

