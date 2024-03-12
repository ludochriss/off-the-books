import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { OrderModel } from 'src/app/models/order.model';
import { SpotAsset } from 'src/app/models/spotAsset.model';
import { CryptoService } from 'src/app/services/cryptoService';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent {


  displayedColumns = ['symbol', 'price', 'quantity', 'side','orderId', 'clientOrderId','actions'];
  openOrderDataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>();
  paginator: any;
  openOrders: OrderModel[] = [];
  tempOrders: any[] = [];

  constructor(
    private cryptoService: CryptoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }
  cancelOrder(orderId:number){}

  getOrders(){
    this.cryptoService.$getOrders().subscribe((data: any) => {
      this.openOrders = data.responseData.openOrders.map((orderData: any) => {
        return {
          symbol: orderData.symbol,
          price: parseFloat(orderData.price),
          quantity: parseFloat(orderData.origQty),
          side: orderData.side,
          stopPrice: orderData.stopPrice ? parseFloat(orderData.stopPrice) : undefined,
          stopLimitPrice: orderData.stopLimitPrice ? parseFloat(orderData.stopLimitPrice) : undefined,
          type: orderData.type,
          orderId: parseInt(orderData.orderId),
          clientOrderId: orderData.clientOrderId


          
        };
      });
      this.openOrderDataSource.data = this.openOrders;
      console.log(this.openOrders);
    });
  }   
}