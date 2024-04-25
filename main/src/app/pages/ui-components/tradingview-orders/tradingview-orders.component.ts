import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TradingViewOrder } from 'src/app/models/order.model';
import { CryptoService } from 'src/app/services/cryptoService';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-tradingview-orders',
  templateUrl: './tradingview-orders.component.html',
  styleUrls: ['./tradingview-orders.component.scss']
})
export class TradingviewOrdersComponent {
  paginator: any;
  tradingViewOrders: TradingViewOrder[];
  tradingViewOrderDataSource: MatTableDataSource<TradingViewOrder> = new MatTableDataSource<TradingViewOrder>();
  displayedColumns = ['symbol', 'id', 'quantity', 'side', 'createdAt','executed', 'actions'];
  constructor(private cryptoService: CryptoService, private snackBar: MatSnackBar, private clipboard: Clipboard) { }
  ngOnInit() {
    this.getTradingViewOrders();
  }
  getTradingViewOrders() {
    this.cryptoService.$getTradingViewOrders().subscribe((data: any) => {
      console.log('Trading View Order Data : ', data);
      this.tradingViewOrders = data.responseData.map((orderData: any) => {
        return {
          symbol: orderData.PartitionKey,
          id: orderData.RowKey,
          executed: orderData.executed.toString(),
          quantity: parseFloat(orderData.quantity),
          side: orderData.side,
          createdAt: orderData.orderCreated.toString()
        };
      });
      this.tradingViewOrderDataSource.data = this.tradingViewOrders;
      console.log('TradingView Orders', this.tradingViewOrders);
    });
  }
  onRefreshClicked(){
    this.getTradingViewOrders();
  }
  onCopyClicked(type: string,id:string) {
    if (type == 'id') {
     this.clipboard.copy(id);
      this.snackBar.open(`Copied ID ${id}`, 'Close', {
        duration: 2000,
      });
    }
    else if (type == 'json') {
      this.clipboard.copy(JSON.stringify({triggerId:id}))
      this.snackBar.open('Copied JSON', 'Close', {
        duration: 2000,
      })
    }
  }
}
