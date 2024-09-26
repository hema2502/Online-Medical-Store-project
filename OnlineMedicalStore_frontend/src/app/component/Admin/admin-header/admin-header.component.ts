import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MedicalstoreService } from 'src/app/medicalstore.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  url: string = '/';
  userName: string = '';
  constructor(
    private eService :MedicalstoreService,
    private router:Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.eService.getAdminName() !== null) {
      this.userName = this.eService.getAdminName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
      console.log(this.url);
    });
  }

  
  // routerToLink(link: string): void {
  //   if (link === '/admin/logout') {
  //     this.eService.adminLogout();
  //     return;
  //   }
  //   this.router.navigate([link]);
  // }
  gotourl(url: string): void {
    if (url === '/admin/logout') {
          this.eService.adminLogout();
          return;
        }
    this.router.navigate(["/"+url]);
  }
}



