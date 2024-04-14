import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { OrderModel } from 'src/app/models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  side: string = '';
  limitTooltipMessage = this.side == 'buy'? 'Buy at a price lower than the current market price' : 'Sell at a price higher than the current market price';

  limitForm = new FormGroup({
    limitPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
    limitQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
    limitMarketPair: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$'),
    ]),
  });
  ocoForm = new FormGroup({
    ocoQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
    ocoMarketPair: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
    ocoStop: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
    ocoStopLimitPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
    ocoPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]*$'),
    ]),
  });

  @Output() orderPlaced = new EventEmitter<OrderModel>();

  constructor(private snackBar: MatSnackBar) { }
  ngOnInit(){
    this.side = 'buy'
  }
  
  //emitter
  onOrderPlaced(order: OrderModel){
    this.orderPlaced.emit(order);
  }

  //TODO: change this to operate for each type of order, limit and oco, currently being changed on both orders
  selectSide(event: MatButtonToggleChange, type:string) {
    this.side = event.source.value.toUpperCase() === 'BUY' ? 'BUY' : 'SELL';
    console.log(this.side);
  }
  
  validateLimitOrder() {
    let lp = this.limitForm.get('limitPrice')?.value;
    let lq = this.limitForm.get('limitQuantity')?.value;
    let ls = this.limitForm.get('limitMarketPair')?.value;
    if (!this.side) {
      this.snackBar.open('Select a Buy or sell', '', { duration: 2000 });
      return null;
    }
    if (lp && ls && lq && this.side) {
      let limitOrder: OrderModel = {
        price: +lp,
        quantity: +lq,
        symbol: ls,
        side: this.side,
        type: 'limit',
      };
      return limitOrder;
    } else 
    {
      this.snackBar.open('Check the values are correct','',{duration: 3000}); return null;
    }
  }
  validateOcoOrder() {
    let oq = this.ocoForm.get('ocoQuantity')?.value;
    let os = this.ocoForm.get('ocoMarketPair')?.value;
    let osl = this.ocoForm.get('ocoStopLimitPrice')?.value;
    let op = this.ocoForm.get('ocoPrice')?.value;
    let ost = this.ocoForm.get('ocoStop')?.value;
    if (!this.side) {
    }
    if (oq && os && osl && op && ost && this.side) {
      let ocoOrder: OrderModel = {
        quantity: +oq,
        symbol: os,
        stopPrice: +ost,
        price: +op,
        stopLimitPrice: +osl,
        side: this.side,
        type: 'oco',
      }; //TODO: add an alert to the user if side is not selected
      console.log('OCO order valid!');
      return ocoOrder;
    } else return null;
  }
  postLimitOrder() {
    let limitOrder = this.validateLimitOrder();
    if (limitOrder) {
      console.log('Limit order posted from the order component')
      this.onOrderPlaced(limitOrder); 
      // this.cryptoService.$postLimitOrder(limitOrder).subscribe((data: any) => {
      //   console.log(data);
      // });
    }
  }
  postOcoOrder() {
    let ocoOrder = this.validateOcoOrder();
    if (ocoOrder) {
      console.log('OCO order posted from the order component');
      this.onOrderPlaced(ocoOrder);
      //this.cryptoService.$postLimitOrder(ocoOrder).subscribe((data: any) => {});
    } else console.log('OcoOrder not valid!');
  }
}
