import { Component, computed, effect, signal } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-signal-application',
  standalone: true,
  imports: [
    DecimalPipe,
    TitleCasePipe,
    DropdownModule,
  ],
  template: `
    <div class="grid">
      <div class="col-3 col-offset-3">
        <h1>Signal Application</h1>
        <h3>Shopping Cart</h3>
        <div>
          <label>Quantity</label>
          <div>
            <p-dropdown styleClass="w-5" [options]="qtyAvailable()" (onChange)="onQuantitySelected($event)"/>
          </div>
          <div>
            <p>Product: {{ selectedProduct().name | titlecase }}</p>
            <p>Price: {{ selectedProduct().price | number: '1.2-2' }}</p>
            <p [style.color]="color()">Total: {{ price() | number: '1.2-2' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class SignalApplicationComponent {
  quantity = signal<number>(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedProduct = signal<Product>({id: 1, name: 'Sushi', price: 89.95});
  products = signal<Product[]>([]);

  price = computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => this.price() > 200 ? 'green' : 'blue');

  constructor() {
    console.log('quantity', this.quantity());
    this.quantity.update(q => q * 2);

    effect(() => {
      console.log('products', JSON.stringify(this.products()));
    });
  }

  // Gets called by angular
  qtyEff = effect(() => console.log('latest quantity', this.quantity()));

  onQuantitySelected(event: DropdownChangeEvent) {
    this.quantity.set(event.value);
  }
}
