import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListitemComponent } from './admin-listitem.component';

describe('AdminListitemComponent', () => {
  let component: AdminListitemComponent;
  let fixture: ComponentFixture<AdminListitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
