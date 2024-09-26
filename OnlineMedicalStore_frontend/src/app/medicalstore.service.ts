import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalstoreService {
  url: string = 'http://localhost:8085';  //backend port number

  category: any = [{
    name: "MULTIVITAMINS", value: 0,
  }, {
    name: "TABLETS", value: 1,
  }, {
    name: "BABYPRODUCTS", value: 2,
  }, {
    name: "LIQUIDS", value: 3,
  }, {
    name: "CAPSULE", value: 4,
  }, {
    name: "INHALERS", value: 5
  }];

  constructor(private http: HttpClient, private router: Router) { }

  // Get product by name
  getProductByName(productName: string): Observable<any> {
    return this.http.get(`${this.url}/api/products?productname=${productName}`);
  }

  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/register", body);
  }

  clientSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/login", body);
  }

  storeClientAuthorization(token: string): void {
    localStorage.setItem("token", token);
  }

  getClientAuthorization(): any {
    const token = localStorage.getItem("token");
    return token;
  }

  storeClientUserName(name: string): void {
    localStorage.setItem("userName", name);
  }

  getClientName(): any {
    const name = localStorage.getItem("userName");
    return name;
  }

  clientLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  adminSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/admin/login", body);
  }

  storeAdminAuthorization(token: string): void {
    localStorage.setItem("admin", token);
  }

  getAdminAuthorization(): any {
    const token = localStorage.getItem("admin");
    return token;
  }

  storeAdminUserName(name: string): void {
    localStorage.setItem("adminName", name);
  }

  getAdminName(): any {
    const name = localStorage.getItem("adminName");
    return name;
  }

  isAdminLoginPresent(): void {
    if (this.getAdminAuthorization() === null) {
      this.router.navigate(['/admin-login']);
    }
  }

  getAllorderList(): Observable<any> {
    return this.http.get(this.url + "/api/orders/");
  }

  adminLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  addProduct(body: any): Observable<any> {
    return this.http.post(this.url + "/api/products/add", body);
  }

  getProductlist(): Observable<any> {
    return this.http.get(this.url + "/api/products");
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.url}/api/products/${id}`);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(this.url + "/api/products/products/" + id);
  }

  editProduct(body: any, id: any): Observable<any> {
    return this.http.put(`${this.url}/api/products/${id}`, body);
  }

  getCategoryList(): any {
    return this.category;
  }
}
