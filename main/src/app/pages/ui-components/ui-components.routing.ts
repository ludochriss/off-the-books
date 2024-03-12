import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppTradeComponent } from './trade/trade.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AboutSiteComponent } from './about-site/about-site.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'trade',
        component: AppTradeComponent,
      },
      {
        path: 'about-me',
        component: AboutMeComponent,
      },
      {
        path: 'about-site',
        component: AboutSiteComponent,
      },
      
    ],
  },
];
