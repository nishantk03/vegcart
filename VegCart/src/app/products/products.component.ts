import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Products[] = [];
  filteredProduct: Products[];
  category: string;

  constructor(productService: ProductService,
    route: ActivatedRoute) {
    productService.
      getAll()
      .switchMap(res => {
        this.products = res;
        return route.queryParamMap;
      })
      .subscribe(res => {
        this.category = res.get('category');

        this.filteredProduct = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });

  }

}
