import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { Type } from '@angular/core';
import { SimpleDialogComponent } from '../component/simple-dialog/simple-dialog.component';
import { Decorator } from './decorator';

export interface ConfirmableOptions {
  title: string;
  text: string;
}

export function Confirmable(): Decorator {
  return (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const config: Partial<ConfirmableOptions> = {
      title: 'Confirmation Needed',
      text: 'Are you sure?'
    };

    descriptor.value = async function (...args: any[]) {
      const dialog: MatDialog = AppComponent.injector.get<MatDialog>(MatDialog as Type<MatDialog>);
      const dialogRef: MatDialogRef<SimpleDialogComponent> = dialog.open(SimpleDialogComponent, {
        data: {
          title: config.title,
          text: config.text
        }
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          return originalMethod.apply(this, args);
        }
      });
    };
    return descriptor;
  };
}
