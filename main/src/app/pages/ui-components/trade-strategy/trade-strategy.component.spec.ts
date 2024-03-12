import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeStrategyComponent } from './trade-strategy.component';

describe('TradeStrategyComponent', () => {
  let component: TradeStrategyComponent;
  let fixture: ComponentFixture<TradeStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeStrategyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
