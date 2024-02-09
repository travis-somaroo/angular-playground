import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RecipePreviewComponent } from '../../../shared/recipe-preview/recipe-preview.component';
import { RxState } from '@rx-angular/state';
import { Recipe } from '../../../model/recipe';
import { RecipeRepository } from '../../../data-access/recipe-repository.service';
import { map, timer } from 'rxjs';
import { select, selectSlice } from '@rx-angular/state/selections';
import { autoIncrementWhenIdle } from '../../../function/auto-increment';

interface State {
  recipeIndex: number;
  recipes: Recipe[];
  index: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-carousel-rx-state',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    NgIf,
    NgTemplateOutlet,
    RecipePreviewComponent
  ],
  providers: [RxState],
  templateUrl: './recipe-carousel-rx-state.component.html',
})
export class RecipeCarouselRxStateComponent {
  // We can pass the recipes into the component
  @Input()
  set recipes(recipes: Recipe[]) {
    this.state.set({recipes});
  }

  recipeIndex$ = this.state.select('recipeIndex');
  recipes$ = this.state.select('recipes');

  recipe$ = this.state.select(
    // Select slice to only update the recipes$ when the state in the select slice array changes
    selectSlice(['recipeIndex', 'recipes']),
    map(({recipes, recipeIndex}) => {
      console.count('computing recipe...');
      return recipes?.[recipeIndex];
    }));

  hasPrevious$ = this.recipeIndex$.pipe(
    select(
      map((i: number) => {
        console.count('computing has previous...');
        return i > 0;
      })
    )
  );

  // Select implements distinctUntilChanged and shareReplay with a ref count
  hasNext$ = this.state.select(
    selectSlice(['recipeIndex', 'recipes']),
    map(({recipes, recipeIndex}) => {
        console.count('computing has next...');
        return recipeIndex + 1 < (recipes?.length ?? 0);
      }
    ));

  constructor(private state: RxState<State>, private recipeRepository: RecipeRepository) {
    this.state.set({recipeIndex: 0});
    // Connect will sub to get recipes and put every emitted values in the state property, handles the sub for us
    this.state.connect('recipes', this.recipeRepository.getRecipes$());
    // Since hasNext$ and recipe$ is observing the whole state they will emit everytime the state changes.
    this.state.connect('index', timer(0, 500));
    autoIncrementWhenIdle(this.state, {
      property: 'recipeIndex',
      interval: 3000
    });
    // this.state.connect(
    //   'recipeIndex',
    //   this.recipeIndex$.pipe(switchMap(v => of(v).pipe(delay(3000)))),
    //   (state) => state.recipeIndex + 1
    // );
  }


  onNext() {
    // Either option is fine, first is more explicit
    this.state.set('recipeIndex', ({recipeIndex}) => recipeIndex + 1);
    // this.state.set(({recipeIndex}) => ({recipeIndex: recipeIndex + 1}))
  }

  onPrevious() {
    this.state.set('recipeIndex', ({recipeIndex}) => recipeIndex - 1);
  }

  onReset() {
    this.state.set({recipeIndex: 0});
  }
}
