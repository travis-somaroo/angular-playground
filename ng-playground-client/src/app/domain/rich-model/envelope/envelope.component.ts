import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { JsonFormComponent } from '../json-form/json-form.component';
import { JsonFormSchema } from '../json-form/json-form.model';
import { DenominationsTableComponent } from '../denominations-table/denominations-table.component';
import { SharedModule } from 'primeng/api';
import { Envelope } from './envelope';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-envelope',
    standalone: true,
    imports: [
        JsonFormComponent,
        DenominationsTableComponent,
        SharedModule,
        TabViewModule,
        NgIf,
        AsyncPipe
    ],
    template: `
        <div class="border-1 border-gray-300 p-1">
            <h2>This represents 1 envelope</h2>
            <div>
                <ng-container *ngIf="schema$ | async as schema">
                    <app-json-form [formSchema]="schema" #jsonForm/>
                </ng-container>
                <h4>Denominations</h4>
                <app-denominations-table/>
            </div>
        </div>
    `,
    styles: ``
})
export class EnvelopeComponent implements AfterViewInit {
    schema$ = new BehaviorSubject<JsonFormSchema>(undefined!);

    @Input() set schema(schema: JsonFormSchema) {
        this.schema$.next(schema);
    }

    envelope!: Envelope;

    @ViewChild('jsonForm') jsonFormComp!: JsonFormComponent;

    ngAfterViewInit() {
        this.schema$.subscribe(() => {
            this.envelope = new Envelope([], this.jsonFormComp);
            console.log('envelope', this.envelope);
            console.log('envelope valid', this.envelope.isValidEnvelope());
        });
    }
}
