import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalstoreService } from 'src/app/medicalstore.service';
import { Observable, take } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-additem',
  templateUrl: './admin-additem.component.html',
  styleUrls: ['./admin-additem.component.css']
})
export class AdminAdditemComponent implements OnInit {

  productname: string = '';
  image: string = '';
  description: string = '';
  mrpPrice: number = 0;
  quantity: number = 0;
  isEdit: boolean = false;
  productId: any;
  getCategoryList: any[] = [];
  category: number = 0;
  mesurement: string = '';

  constructor(
    private gService: MedicalstoreService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        this.gService.getProductById(params?.id).pipe(take(1)).subscribe((res: any) => {
          if (!!res && res?.productId) {
            const product: Product = res;
            this.productname = product?.productname;
            this.description = product?.description;
            this.image = product?.image;
            this.mrpPrice = product?.mrpPrice;
            this.quantity = product?.quantity;
            this.productId = product?.productId;
            const categoryName = this.getCategoryList.find((cate: any) => cate?.name.toString() === product?.category)?.value;
            this.category = categoryName;
            this.mesurement = product?.measurment;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.gService.isAdminLoginPresent();
    this.getCategoryList = this.gService.getCategoryList();
  }

  validateInputs(): boolean {
    if (this.mrpPrice <= 0) {
      alert("MRP Price should be greater than 0");
      return false;
    }
    if (this.quantity <= 0) {
      alert("Quantity should be greater than 0");
      return false;
    }
    return true;
  }

  onAddProduct(): void {
    if (this.productname === '') {
      alert("Product name is required");
      return;
    }
    if (this.description === '') {
      alert("Description is required");
      return;
    }
    if (this.image === '') {
      alert("Image should not be blank");
      return;
    }

    if (!this.validateInputs()) {
      return;
    }

    const body: any = {
      productname: this.productname,
      image: this.image,
      description: this.description,
      mrpPrice: this.mrpPrice,
      quantity: this.quantity,
      category: this.category,
      measurment: this.mesurement
    };

    // Check if the product already exists by name
    this.gService.getProductByName(this.productname).pipe(take(1)).subscribe((existingProduct: any) => {
      if (existingProduct && existingProduct.productId) {
        const updatedQuantity = existingProduct.quantity + this.quantity;
        const updatedProduct: any = {
          ...existingProduct,
          quantity: updatedQuantity
        };

        this.gService.editProduct(updatedProduct, existingProduct.productId).pipe(take(1)).subscribe((res: any) => {
          alert("Product quantity updated successfully");
          this.router.navigate(["/Admin/list-item"]);
        }, err => {
          alert("Something went wrong, please try again.");
        });
      } else {
        // If no product with the same name exists, add a new product
        this.gService.addProduct(body).pipe(take(1)).subscribe((res: any) => {
          alert("Product added successfully");
          this.router.navigate(["/Admin/list-item"]);
        }, err => {
          alert("Something went wrong, please try again.");
        });
      }
    });
  }
}
