import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id).take(1).subscribe(res => this.product = res);
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);
   
    this.router.navigate(['/admin/products']);
  }

}
