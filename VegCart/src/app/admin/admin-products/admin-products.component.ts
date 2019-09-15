import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Products } from '../../models/products';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Products[];
  subscription: Subscription;
  tableResource: DataTableResource<Products>;
  items: Products[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(res => {
        this.products = res;  //Here we will not use take(1) as user can edit in multi window so it will not reflect that is y ngOnDestroy
        this.initialiseTable(res);
      });
  }

  private initialiseTable(products: Products[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  ngOnInit() {
  }

  filter(query: string) {
    const filteredProduct = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

  this.initialiseTable(filteredProduct);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
