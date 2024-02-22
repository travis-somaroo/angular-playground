import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { JsonFormComponent } from '../../../shared/json-form/json-form.component';
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonFormSchema } from '../../../shared/json-form/json-form.model';
import { DropdownModule } from 'primeng/dropdown';
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
  private depositService = inject(DepositService);

  @ViewChildren('innerBagFormCmp') innerBagsFormCmp!: QueryList<JsonFormComponent>;

  activeTabIndex = 0;
  depositRuleOptions = [
    {id: 1, name: 'Deposit Rule 1'},
    {id: 2, name: 'Deposit Rule 2'}
  ];

  numInnerBags$ = new BehaviorSubject<number>(1);
  depositRuleCtrl = new FormControl<Partial<JsonFormSchema>>(undefined!, []);

  schema$ = this.depositService.getSchema$();

  innerBagSchemas$ = combineLatest([
    this.schema$.pipe(map((data: JsonFormSchema) => data.innerBagRule)),
    this.numInnerBags$.asObservable()
  ]).pipe(
    filter(([nestedSchema]) => !!nestedSchema.propertyRules),
    map(([nestedSchema, numBags]) => {
      const schemas = [];
      for (let i = schemas.length; i < numBags; i++) {
        const modifiedFormData = {...nestedSchema};
        schemas.push({formData: modifiedFormData});
      }
      return schemas;
    }),
  );

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
