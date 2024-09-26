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
  mesurement: string='';

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
            console.log('>>>>', product);
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
          console.log(res);
        });
      }
    });
  }

  ngOnInit(): void {
    this.gService.isAdminLoginPresent();
    this.getCategoryList = this.gService.getCategoryList();
  }

  validateInputs(): boolean {
    // Check if MRP Price is negative
    if (this.mrpPrice <= 0) {
      alert("MRP Price should be greater than 0");
      return false;
    }

    // Check if Quantity is negative
    if (this.quantity <= 0) {
      alert("Quantity should be greater than 0");
      return false;
    }

    // All validations passed
    return true;
  }

  onAddProduct(): void {
    // Validate Product Name, Description, Image, etc.
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

    // Validate MRP and Quantity
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

    if (this.isEdit) {
      console.log("=======>", body);
      this.gService.editProduct(body, this.productId).pipe(take(1)).subscribe((res: any) => {
        console.log("*****", res);
        if (res && res?.productId) {
          alert("Product updated successfully");
          this.router.navigate(["/Admin/list-item"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something went wrong!! Please try again");
      });
    } else {
      console.log("=======>", body);
      this.gService.addProduct(body).pipe(take(1)).subscribe((res: any) => {
        console.log("*****", res);
        if (res && res?.productId) {
          alert("Product added successfully");
          this.router.navigate(["/Admin/list-item"]);
        }
      }, err => {
        console.log("Error  ", err);
        alert("Something went wrong!! Please try again");
      });
    }
  }
}
