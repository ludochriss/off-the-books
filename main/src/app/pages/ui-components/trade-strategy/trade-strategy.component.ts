import { Component, Input } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-trade-strategy',
  templateUrl: './trade-strategy.component.html',
  styleUrls: ['./trade-strategy.component.scss'],
})
export class TradeStrategyComponent {
  constructor() {}
  @Input() order: OrderModel;
  ngOnInit(): void {
    console.log(this.order);
  }
}
