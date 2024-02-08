import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ReplaySubject, takeUntil } from 'rxjs';
import { RecipePreviewComponent } from '../../../shared/recipe-preview/recipe-preview.component';
import { Recipe } from '../../../model/recipe';
import { RecipeRepository } from '../../../data-access/recipe-repository.service';

@Component({
  selector: 'app-recipe-imperative-carousel',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RecipePreviewComponent,
    NgIf,
    ButtonModule
  ],
  templateUrl: './recipe-carousel-imperative.component.html',
})
export class RecipeCarouselImperativeComponent implements OnInit, OnDestroy {
  // Use a replay subject to replay a value after comp destruction, rare cases.
  destroy$ = new ReplaySubject(1);
  recipeIndex = 0;
  recipes?: Recipe[];

  constructor(private recipeRepository: RecipeRepository) {
  }

  ngOnInit() {
    this.recipeRepository
      .getRecipes$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipes) => (this.recipes = recipes));
  }

  onNext() {
    this.recipeIndex++;
  }

  onPrevious() {
    this.recipeIndex--;
  }

  onReset() {
    this.recipeIndex = 0;
  }

  getRecipe() {
    return this.recipes?.[this.recipeIndex];
  }

  hasPrevious() {
    return this.recipeIndex > 0;
  }

  hasNext() {
    console.count('compute hasNext...');
    return this.recipeIndex + 1 < (this.recipes?.length ?? 0);
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
