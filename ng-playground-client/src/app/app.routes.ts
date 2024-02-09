import { Routes } from '@angular/router';
import {
  RecipeCarouselRxStateComponent
} from './domain/rx-state-demo/recipe-carousel-rx-state/recipe-carousel-rx-state.component';
import {
  RecipeCarouselImperativeComponent
} from './domain/imperative-demo/recipe-carousel/recipe-carousel-imperative.component';
import { RecipeCarouselRxJSComponent } from './domain/rxjs-demo/recipe-carousel-rx-js/recipe-carousel-rx-js.component';

export const routes: Routes = [
  {
    path: 'rx-state',
    component: RecipeCarouselRxStateComponent
  },
  {
    path: 'imperative',
    component: RecipeCarouselImperativeComponent
  },
  {
    path: 'rxjs',
    component: RecipeCarouselRxJSComponent
  },
  {
    path: '',
    redirectTo: 'rx-state',
    pathMatch: 'full'
  }
];
