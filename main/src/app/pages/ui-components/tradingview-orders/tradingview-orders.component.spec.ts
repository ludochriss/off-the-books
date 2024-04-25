import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingviewOrdersComponent } from './tradingview-orders.component';

describe('TradingviewOrdersComponent', () => {
  let component: TradingviewOrdersComponent;
  let fixture: ComponentFixture<TradingviewOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingviewOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingviewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
