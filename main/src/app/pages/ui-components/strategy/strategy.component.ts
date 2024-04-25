import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderModel, StrategyOrderModel } from 'src/app/models/order.model';
import { CryptoService } from 'src/app/services/cryptoService';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent {
  side: string = '';
  selectedOcoStrategy: string = '';
  selectedLimitStrategy: string = '';


  marketForm = new FormGroup({

    marketQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    marketPair: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$'),
    ])     
  });

  limitForm = new FormGroup({
    limitPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    limitQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    limitMarketPair: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$'),
    ]),
    limitStrategyTriggerPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    limitStrategyType: new FormControl('', [Validators.required]),
  });
  ocoForm = new FormGroup({
    ocoQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    ocoStop: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    ocoMarketPair: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$'),
    ]),
    ocoStopLimitPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    ocoPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    ocoStrategyTriggerOrderId: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*.?[0-9]*$'),
    ]),
    ocoStrategyType: new FormControl('', [Validators.required]),
  });

  orderTypes: any[] = [
    { value: 'entry', viewValue: 'Entry-Notworking' },
    { value: 'ocoExit', viewValue: 'OCO Exit Order' },
    { value: 'takeprofit', viewValue: 'Take Profit-NotWorking' },
    { value: 'condition', viewValue: 'Condition-NotWorking' },
  ];
  strategy: any[] = [];
  @Output() strategyPlaced = new EventEmitter<StrategyOrderModel>();

  constructor(private snackBar: MatSnackBar,private cryptoService:CryptoService) {}
  ngOnInit() {
    this.side = 'buy';
  }

  selectSide(event: MatButtonToggleChange) {
    this.side = event.source.value.toUpperCase() === 'BUY' ? 'BUY' : 'SELL';
    console.log(this.side);
  }
  processStrategy() {
    console.log(this.selectedOcoStrategy);
    if (this.selectedOcoStrategy == 'ocoExit') {
      let order = this.validateOcoOrder();
      if (order) {
        let oi = this.ocoForm.get('ocoStrategyTriggerOrderId')?.value;
        if (oi) {
          let strat: StrategyOrderModel = {
            orderType: 'oco',
            orderSubType: 'exit',
            orderTrigger: {
              orderId: oi,
              //TODO:need to remove this hardcoding
              triggerType: 'executed',
            },
            orderDetails: order,
          };
          this.onStrategyOrderPlaced(strat);
        }
      }
    }
  }
  createTradingViewAlertOrder(){
    let order = {
      symbol: this.marketForm.get('marketPair')?.value,
      quantity: this.marketForm.get('marketQuantity')?.value,
      side: this.side,
      type: 'market'     
    }
    console.log("Order : ",order);
    this.cryptoService.$createTradingViewAlertOrder(order).subscribe((data: any) => {
      console.log(data);
    });
  }
  onStrategyOrderPlaced(model: StrategyOrderModel) {
    console.log('Strategy Order Placed', model);
    this.strategyPlaced.emit(model);
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
    } else {
      this.snackBar.open('Check the values are correct', '', {
        duration: 3000,
      });
      return null;
    }
  }
  ocoStrategyChanged(event: MatSelectChange) {
    this.selectedOcoStrategy = event.value;
  }
  limitStrategyChanged(event: MatSelectChange) {
    this.selectedLimitStrategy = event.value;
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
}
