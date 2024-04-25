import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderModel, OrderTriggerModel, StrategyOrderModel } from '../models/order.model';

//api endpoiints
// CreateOrder: [POST] http://localhost:7071/api/CreateOrder
// CreateStrategyOrder: [GET,POST] http://localhost:7071/api/CreateStrategyOrder
// GetAccountInfo: [GET,POST] http://localhost:7071/api/GetAccountInfo
// QueryExistingOrders: [GET,POST] http://localhost:7071/api/QueryExistingOrders
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json', 
});
@Injectable({ providedIn: 'root' })
export class CryptoService {
  private cryptoApiUrl = environment.apiUrl;

  constructor(private client: HttpClient) {}
  $getAccountInfo(): Observable<any> {
    return this.client.get(this.cryptoApiUrl + '/GetAccountInfo');
  }
  $cancelOrderById(orderId: number,symbol:string): Observable<any> {
    let body = {
      orderId: orderId,
      symbol: symbol.toUpperCase(),
    };    
    return this.client.post(this.cryptoApiUrl + '/CancelOrder', body,{
      headers: headers,
    });
  }
  $createTradingViewAlertOrder(orderModel:any): Observable<any> {
    return this.client.post(this.cryptoApiUrl + '/CreateTradingViewAlertOrder', orderModel,{
      headers: headers,
    });
  }

  $postOrder(orderModel: any): Observable<any> {
    let payload = this.buildOrderPayload(orderModel);
    return this.client.post(this.cryptoApiUrl + '/CreateOrder', payload, {
      headers: headers,
    });
  }
  $getOrders(symbol?: string, body?: string): Observable<any> {
    if (symbol && body) {
      //TODO: probably make the body here
      return this.client.post(
        this.cryptoApiUrl + '/QueryExistingOrders?symbol=' + symbol,
        body,
        { headers: headers }
      );
    }
    return this.client.get(this.cryptoApiUrl + '/QueryExistingOrders');
  }
$getStrategyOrders(): Observable<any> {
    return this.client.get(this.cryptoApiUrl + '/GetStrategyOrders');
  }

  $postStrategyOrder(payload:StrategyOrderModel): Observable<any> {    
    return this.client.post(this.cryptoApiUrl + '/CreateStrategyOrder',payload, {
      headers: headers,
    });
  }
  $getTradingViewOrders(): Observable<any> {
    return this.client.get(this.cryptoApiUrl + '/GetTradingViewOrders');
  }
  // buildStrategyPayload(
  //   order: OrderModel,
  //   orderType: string,
  //   orderSubType: string,
  //   orderTrigger: OrderTriggerModel
  // ) {
  //   return {
  //     orderType: orderType,
  //     orderSubType: '',
  //     orderTrigger: {},
  //     orderDetails: order,
  //   };
  // }
  buildOrderPayload(order: OrderModel) {
    return {
      orderType: order.type,
      orderDetails: order,
    };
  }  
}
