import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  /*  save(): void {
     this.heroService.updateHero(this.hero)
       .subscribe(() => this.goBack());
   } */


  // making below code as async by adding debounce (which is setTimeout())
  save(): void {
    this.debounce(() => {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }, 250, false)();
  }

  // making below code as async by adding promises
  // promises-> r always async code
  save2(): void {
    const p = new Promise((resolve) => {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
      resolve(); // resolving the promise
    });
  }



  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        // Check if the function already ran with the immediate flag
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      // Immediate mode and no wait timer? Execute the function..
      if (callNow) {
        func.apply(context, args);
      }
    };
  }



}
