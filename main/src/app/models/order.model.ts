export interface OrderModel {
  symbol: string;
  price: number;
  quantity: number;
  side: string;
  stopPrice?: number;
  stopLimitPrice?: number;
  type?: string;
  orderId?: number;
  // orderListId?: number;
  clientOrderId?: string;
  // origQty?: string;
  // cummulativeQuoteQty?: string;
  // status?: string;
  // timeInForce?: string;
  // executedQty?: string;
  // icebergQty?: string;
  time?: number;
  // updateTime?: number;
  // isWorking?: boolean;
  // workingTime?: number;
  // origQuoteOrderQty?: string;
  // selfTradePreventionMode?: string;
}

export interface BatchOrder{
  entry :OrderModel;
 exits:OrderModel;
}
export interface StrategyOrderModel{
  orderType: string;
  orderSubType: string;
  orderTrigger: OrderTriggerModel;
  orderDetails: OrderModel;
} 
export interface OrderTriggerModel{
  orderId:string,
  triggerType:string,

}

