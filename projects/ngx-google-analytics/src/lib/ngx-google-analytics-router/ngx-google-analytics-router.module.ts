import { NgModule, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER } from '../initializers/google-analytics-router.initializer';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';

@NgModule({
  imports: [
    CommonModule,
    NgxGoogleAnalyticsModule
  ],
  providers: [
    NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER
  ],
  declarations: []
})
export class NgxGoogleAnalyticsRouterModule { }
