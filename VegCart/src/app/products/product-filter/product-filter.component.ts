import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('inputCategory') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();

  }

  ngOnInit() {
  }

}
