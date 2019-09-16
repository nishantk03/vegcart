import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('inputProduct') product: Products;
  @Input('inputShowActions') showActions = true;

  constructor() { }


}
