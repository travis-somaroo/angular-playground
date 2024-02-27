import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { JsonFormComponent } from '../../../shared/json-form/json-form.component';
import { BehaviorSubject, combineLatest, filter, map, Observable, scan, shareReplay, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonFormSchema } from '../../../shared/json-form/json-form.model';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DepositService } from './deposit.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-deposit',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    TabViewModule,
    NgIf,
    AsyncPipe,
    NgForOf,
    JsonFormComponent,
    ButtonModule
  ],
  templateUrl: './add-deposit.component.html',
})
export class AddDepositComponent {
  protected depositService = inject(DepositService);

  @ViewChildren('innerBagFormCmp') innerBagsFormCmp!: QueryList<JsonFormComponent>;

  activeTabIndex = 0;

  numInnerBags$ = new BehaviorSubject<number>(1);
  depositRuleCtrl = new FormControl<any>(undefined!, []);

  schema$:Observable<JsonFormSchema> = this.depositService.depositSelected$.pipe(
    filter(s => !!s),
    tap(s => console.log('schema', s)),
    shareReplay(1)
  );

  innerBagSchemas$ = combineLatest([
    this.schema$.pipe(map((data: JsonFormSchema) => data.innerBagRule)),
    this.numInnerBags$.asObservable()
  ]).pipe(
    tap(s => console.log('inner schema', s)),
    filter(([nestedSchema]) => !!nestedSchema.propertyRules),
    scan((acc, [nestedSchema, numBags]) => {
      let schemas = [...acc];

      for (let i = schemas.length; i < numBags; i++) {
        const modifiedFormData = {...nestedSchema};
        schemas.push({formData: modifiedFormData});
      }

      if (schemas.length > numBags) {
        schemas = schemas.slice(0, numBags);
      }

      return schemas;
    }, []),
    shareReplay(1)
  );

  onDepositSelected(event: DropdownChangeEvent) {
    this.depositService.setSelectedDeposit(event.value);
  }

  protected onAddInnerBag(): void {
    const currentNum = this.numInnerBags$.getValue();
    this.numInnerBags$.next(currentNum + 1);
  }

  protected onRemoveInnerBag(): void {
    const currentNum = this.numInnerBags$.getValue();
    if (currentNum > 1) {
      this.numInnerBags$.next(currentNum - 1);
      this.switchToPreviousTab();
    }
  }

  protected label(index: number): string {
    return `Inner Bag ${index + 1}`;
  }

  private switchToPreviousTab(): void {
    if (this.activeTabIndex > 0) {
      this.activeTabIndex -= 1;
    }
  }

}
