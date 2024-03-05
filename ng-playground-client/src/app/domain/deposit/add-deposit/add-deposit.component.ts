import { Component, inject, signal } from '@angular/core';
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
