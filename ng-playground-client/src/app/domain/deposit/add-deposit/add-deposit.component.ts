import { Component, effect, inject, signal } from '@angular/core';
import { JsonFormComponent } from '../../../shared/json-form/json-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  outerBagForm = signal<FormGroup>(undefined!);
  innerBagForms = signal<FormGroup[]>([]);
  denominations = signal<number[]>([]);

  activeTabIndex = 0;
  depositRuleCtrl = new FormControl<any>(undefined!, []);

  constructor() {
    effect(() => {
      console.log('forms', this.innerBagForms());
    });
  }

  get aggregateValid() {
    const innerBagsTotal = this.innerBagForms()
      .map(form => +form.get('amount')?.getRawValue())
      .reduce((acc, amount) => Number(acc) + Number(amount), 0);
    const outerBagTotal = Number(this.outerBagForm()?.get('totalAmount').getRawValue());
    return innerBagsTotal === outerBagTotal;
  }

  get innerBagTotalAmountValid() {
    const innerBagsTotal = this.innerBagForms()
      .map(form => +form.get('amount').getRawValue())
      .reduce((acc, amount) => Number(acc) + Number(amount), 0);

    const denominationsTotal = this.denominations().reduce((acc, amount) => Number(acc) + Number(amount), 0);
    console.log("foo");
    return innerBagsTotal === denominationsTotal;
  }

  onDepositSelected(event: DropdownChangeEvent) {
    this.innerBagForms.set([]);
    this.depositService.setSelectedDeposit(event.value);
  }

  onSubmit() {
    const innerBags = this.innerBagForms().map(form => form.getRawValue());
    const deposit = {
      totalAmount: this.outerBagForm().get('totalAmount').getRawValue(),
      products: this.denominations(),
      innerBags
    };
    console.log(deposit);
  }

  outerBagEvent(event: FormGroup) {
    this.outerBagForm.set(event);
  }

  innerBagEvent(event: FormGroup) {
    this.innerBagForms.update(bags => [...bags, event]);
  }

  amountEvent(event: number) {
    this.denominations.update(amounts => [...amounts, event]);
  }

  protected onAddInnerBag(): void {
    this.depositService.addInnerBagSchema();
  }

  protected onRemoveInnerBag(): void {
    if (this.depositService.innerBagSize > 1) {
      this.depositService.removeInnerBagSchema();
      this.innerBagForms().pop();
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
