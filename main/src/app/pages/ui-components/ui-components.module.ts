import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AppTradeComponent } from './trade/trade.component';
import { TradeStrategyComponent } from './trade-strategy/trade-strategy.component';
import { OrderComponent } from './order/order.component';
import { StrategyComponent } from './strategy/strategy.component';
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { BalancesComponent } from './balances/balances.component';
import { AboutSiteComponent } from './about-site/about-site.component';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    AppBadgeComponent,
    AppChipsComponent,
    AppListsComponent,
    AppMenuComponent,
    AppTooltipsComponent,
    AppTradeComponent,
    TradeStrategyComponent,
    OrderComponent,
    StrategyComponent,
    OpenOrdersComponent,
    BalancesComponent,
    AboutSiteComponent,
    AboutMeComponent,
  ],
})
export class UicomponentsModule {}
