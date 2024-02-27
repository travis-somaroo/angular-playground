import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { JsonFormComponent } from '../../../shared/json-form/json-form.component';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonFormSchema } from '../../../shared/json-form/json-form.model';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DepositService } from './deposit.service';
import { ButtonModule } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';

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
  depositRuleCtrl = new FormControl<any>(undefined!, []);

  onDepositSelected(event: DropdownChangeEvent) {
    this.depositService.setSelectedDeposit(event.value);
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
