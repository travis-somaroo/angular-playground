import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgIf } from '@angular/common';
import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [
    CardComponent,
    NgIf
  ],
  template: `
    <app-card *ngIf="recipe">
      <h2 data-role="recipe-name">{{ recipe.name }}</h2>
      <ng-content></ng-content>
    </app-card>`,
  styles: [
    `
      h2 {
        font-size: 1.2em;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class RecipePreviewComponent {
  @Input() recipe?: Recipe;
}
