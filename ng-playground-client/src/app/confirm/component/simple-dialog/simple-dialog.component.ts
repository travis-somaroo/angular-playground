import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

export type DialogData = {
  title: string;
  text: string;
}

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  template: `
    <h1 mat-dialog-title> {{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.text }}
    </div>
    <div mat-dialog-actions>
      <button [mat-dialog-close]="false" mat-button>Cancel</button>
      <button [mat-dialog-close]="true" mat-button>Ok</button>
    </div>
  `,
  styles: ``
})
export class SimpleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

}
