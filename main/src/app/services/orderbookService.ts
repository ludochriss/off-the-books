import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderModel, OrderTriggerModel, StrategyOrderModel } from '../models/order.model';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});