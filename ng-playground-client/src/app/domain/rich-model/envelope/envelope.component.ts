import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { JsonFormComponent } from '../json-form/json-form.component';
import { JsonFormSchema } from '../json-form/json-form.model';
import { DenominationsTableComponent } from '../denominations-table/denominations-table.component';
import { SharedModule } from 'primeng/api';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [
    JsonFormComponent,
    DenominationsTableComponent,
    SharedModule,
    TabViewModule
  ],
  template: `
    <div class="border-1 border-gray-300 p-1">
      <h2>This represents 1 envelope</h2>
      <div>
        <app-json-form [formSchema]="schema"/>
        <h4>Denominations</h4>
        <app-denominations-table/>
      </div>
    </div>
  `,
  styles: ``
})
export class EnvelopeComponent {
  @Input() index!: number;
  @Input() schema!: JsonFormSchema;

}
