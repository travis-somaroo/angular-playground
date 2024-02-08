import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { RecipePreviewComponent } from '../../shared/recipe-preview/recipe-preview.component';
import { BehaviorSubject, combineLatest, map, ReplaySubject, shareReplay, takeUntil } from 'rxjs';
import { RecipeRepository } from '../../data-access/recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-carousel-rx-js',
  standalone: true,
  imports: [
    ButtonModule,
    NgIf,
    NgTemplateOutlet,
    RecipePreviewComponent,
    AsyncPipe
  ],
  templateUrl: './recipe-carousel-rx-js.component.html',
})
export class RecipeCarouselRxJSComponent implements OnDestroy {
  destroy$ = new ReplaySubject(1);

  recipeIndex$ = new BehaviorSubject(0);
  recipes$ = this.recipeRepository
    .getRecipes$()
    .pipe(takeUntil(this.destroy$), shareReplay(1));

  recipe$ = combineLatest([this.recipes$, this.recipeIndex$]).pipe(
    map(([recipes, index]) => recipes?.[index])
  );

  hasPrevious$ = this.recipeIndex$.pipe(map((index) => index > 0));

  hasNext$ = combineLatest([this.recipes$, this.recipeIndex$]).pipe(
    map(([recipes, index]) => {
      console.count('compute hasNext...');
      return index + 1 < recipes.length;
    })
  );

  constructor(private recipeRepository: RecipeRepository) {
  }

  onNext() {
    this.recipeIndex$.next(this.recipeIndex$.value + 1);
  }

  onPrevious() {
    this.recipeIndex$.next(this.recipeIndex$.value - 1);
  }

  onReset() {
    this.recipeIndex$.next(0);
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
