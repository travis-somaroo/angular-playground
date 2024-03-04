import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { JsonFormComponent } from '../../../shared/json-form/json-form.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DepositService } from './deposit.service';
import { ButtonModule } from 'primeng/button';
import { DenominationsTableComponent } from '../denominations-table/denominations-table.component';

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
    ButtonModule,
    DenominationsTableComponent,
  ],
  templateUrl: './add-deposit.component.html',
})
export class AddDepositComponent {
  protected depositService = inject(DepositService);

  @ViewChild('outerBagFormCmp') outerBagsFormCmp!: JsonFormComponent;
  @ViewChildren('innerBagFormCmp') innerBagsFormCmp!: QueryList<JsonFormComponent>;
  @ViewChildren('denominationsTable') denominations!: QueryList<DenominationsTableComponent>;

  activeTabIndex = 0;
  depositRuleCtrl = new FormControl<any>(undefined!, []);

  onDepositSelected(event: DropdownChangeEvent) {
    this.depositService.setSelectedDeposit(event.value);
  }

  // Aggregated validation rule
  validAggregatedValidationRule(): boolean {
    const outerBagTotal = this.outerBagsFormCmp?.formGroup?.get('totalAmount').getRawValue();

    if (outerBagTotal > 0) {
      const innerBagsTotal = this.innerBagsFormCmp
        .map((c: JsonFormComponent) => c?.formGroup?.get('amount')?.getRawValue() || 0)
        .reduce((acc, amount) => amount + acc, 0);

      const denominationsTotal = this.denominations
        .map((c: DenominationsTableComponent) => c.amount || 0)
        .reduce((acc, amount) => acc + amount, 0);

      console.log('outerBagTotal:', outerBagTotal);
      console.log('innerBagsTotal:', innerBagsTotal);
      console.log('denominationsTotal:', denominationsTotal);

      const isValid = innerBagsTotal === denominationsTotal && outerBagTotal === innerBagsTotal;
      console.log('isValid:', isValid);

      return isValid;
    }

    return true;
  }



  onSubmit() {
    console.log('submitted');
  }

  protected onAddInnerBag(): void {
    this.depositService.addInnerBagSchema();
  }

  protected onRemoveInnerBag(): void {
    if (this.depositService.innerBagSize > 1) {
      this.depositService.removeInnerBagSchema();
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
