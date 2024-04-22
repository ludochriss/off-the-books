import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedOrdersComponent } from './staged-orders.component';

describe('StagedOrdersComponent', () => {
  let component: StagedOrdersComponent;
  let fixture: ComponentFixture<StagedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
