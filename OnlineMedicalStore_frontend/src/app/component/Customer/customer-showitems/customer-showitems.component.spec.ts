import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerShowitemsComponent } from './customer-showitems.component';

describe('CustomerShowitemsComponent', () => {
  let component: CustomerShowitemsComponent;
  let fixture: ComponentFixture<CustomerShowitemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerShowitemsComponent]
    });
    fixture = TestBed.createComponent(CustomerShowitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
