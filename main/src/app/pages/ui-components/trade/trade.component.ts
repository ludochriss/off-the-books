import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CryptoService } from 'src/app/services/cryptoService';
import { SpotAsset } from 'src/app/models/spotAsset.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, NgModule } from '@angular/core';
import { OrderModel, StrategyOrderModel } from 'src/app/models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
})
export class AppTradeComponent {
  orders: OrderModel[] = [];
  side: string = '';

  // show and hide
  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  // Limit Order message
  message = new FormControl('Original Message');

  accInfo: any;

  constructor(
    private cryptoService: CryptoService,
    private snackBar: MatSnackBar
  ) {}
  ngAfterViewInit() {
    //this.getAccountInfo();
    this.getOrders();
  }

  getOrders(symbol?: string) {
    if (symbol) {
      this.cryptoService.$getOrders(symbol).subscribe((data: any) => {
        // console.log('Orders : ', data);
        this.orders = data.responseData;
      });
    } else {
      this.cryptoService.$getOrders().subscribe((data: any) => {
        // console.log('Orders : ', data);
        this.orders = data.responseData;
      });
    }
  }
  postOrder(order: OrderModel) {
    // console.log('Order Placed', order);
    this.cryptoService.$postOrder(order).subscribe((data: any) => {
      if (data.responseData) {
        this.snackBar.open('Order Placed', '', { duration: 2000 });
      } else {
        this.snackBar.open('Order Failed', '', { duration: 2000 });
      }
    });
  }
  postStrategyOrder(stratOrder: StrategyOrderModel) {
    this.cryptoService.$postStrategyOrder(stratOrder).subscribe((data: any) => {
      if (data.responseData) {
        this.snackBar.open('Strategy Order Placed', '', { duration: 2000 });
      } else {
        this.snackBar.open('Strategy Order Failed', '', { duration: 2000 });
      }
      // console.log('Response : ', data);
    });
  }
}
