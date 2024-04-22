import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StrategyOrderModel } from 'src/app/models/order.model';
import { CryptoService } from 'src/app/services/cryptoService';

@Component({
  selector: 'app-staged-orders',
  templateUrl: './staged-orders.component.html',
  styleUrls: ['./staged-orders.component.scss']
})
export class StagedOrdersComponent {
  stagedOrders: StrategyOrderModel[];
  stagedOrdersDataSource: MatTableDataSource<StrategyOrderModel> = new MatTableDataSource<StrategyOrderModel>();
  accInfo: any;
  displayedColumns = ['symbol', 'price', 'side', 'quantity', 'stopPrice', 'stopLimitPrice','triggerType']; 
  //@ViewChild(MatPaginator) paginator: MatPaginator;
paginator:any;
  constructor(private cryptoService: CryptoService){    
  }
  ngOnInit(){
  this.getStagedOrders();
}

getStagedOrders(){
  this.cryptoService.$getStrategyOrders().subscribe((data: any) => {
    console.log('Data : ',data);
    this.stagedOrders = data.responseData.map((orderData:any) => {
      return {
         symbol: orderData.symbol,
          price: parseFloat(orderData.price),
          quantity: parseFloat(orderData.quantity),
          side: orderData.side,
          stopPrice: orderData.stopPrice ? parseFloat(orderData.stopPrice) : undefined,
          stopLimitPrice: orderData.stopLimitPrice ? parseFloat(orderData.stopLimitPrice) : undefined,
          type: orderData.type,
          orderId: parseInt(orderData.orderId),
          clientOrderId: orderData.clientOrderId,
          bindingOrderId: parseInt(orderData.bindingOrderId), 
          triggerType : orderData.triggerType,       
      };
    });
    this.stagedOrdersDataSource.data = this.stagedOrders;
    console.log('Staged Orders', this.stagedOrders);
  });
}


}
