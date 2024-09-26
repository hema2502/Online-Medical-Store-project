import { Component } from '@angular/core';
import { Order } from '../../models/order.model';
import { MedicalstoreService } from 'src/app/medicalstore.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent {
  orderList: Order[] = [];
  tempOrderList: Order[] = [];
  today = new Date();

  constructor(
    private fService: MedicalstoreService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.fService.isAdminLoginPresent();
  }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {
    this.fService.getAllorderList().pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && Array.isArray(res)) {
          this.orderList = res;
          this.tempOrderList = res;
        }
      }, err => {
        console.error("Error fetching order list:", err);
      }
    );
  }

  getDate(d: string | undefined): any {
    if (!!d && d !== null) {
      return this.datePipe.transform(d, "shortDate") || null;
    }
    return null;
  }

  changeDate(ev: any): void {
    const selectedDate: Date = new Date(ev?.value);
    const startOfDay: number = new Date(selectedDate.setHours(0, 0, 0, 0)).getTime();
    const endOfDay: number = new Date(selectedDate.setHours(23, 59, 59, 999)).getTime();

    this.orderList = this.tempOrderList.filter((item: Order) => {
      const orderDate: number = new Date(item?.orderedDate).getTime();
      return orderDate >= startOfDay && orderDate <= endOfDay;
    });
  }
}
