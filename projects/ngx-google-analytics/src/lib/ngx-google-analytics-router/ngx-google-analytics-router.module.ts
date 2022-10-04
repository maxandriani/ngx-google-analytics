import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER } from '../initializers/google-analytics-router.initializer';
import { IGoogleAnalyticsRoutingSettings } from '../interfaces/i-google-analytics-routing-settings';
import { NgxGoogleAnalyticsModule } from '../ngx-google-analytics.module';
import { NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-router-settings-token';

/**
 * Attach a listener to `NavigationEnd` Router event. Every time Router finishes the page resolution it should call the `NavigationEnd` event.
 * We assume that NavigationEnd is the final page resolution and call GA `page_view` command.
 *
 * To avoid double binds, we also destroy the subscription when de Bootstrap Component is destroied. But, we don't know for sure
 * that this strategy does not cause double bind on multiple bootstrap components.
 *
 * We are using the component's injector reference to resolve Router, so I hope there is no problem with double binding.
 *
 * If you have this problem, I encourage not Use NgxGoogleAnalyticsRouterModule and atach the listener on AppComponent initialization.
 *
 * This Module is just a sugar for:
 *
```typescript
constructor(private router: Router) {}
...
ngOnInit() {
  ...
  this.router
    .events
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(event => {
      if (event instanceof NavigationEnd) {
        gaService.pageView(event.urlAfterRedirects, undefined);
      }
    });
```
 */
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
export class NgxGoogleAnalyticsRouterModule {
  static forRoot(settings?: IGoogleAnalyticsRoutingSettings): ModuleWithProviders<NgxGoogleAnalyticsRouterModule> {
    return {
      ngModule: NgxGoogleAnalyticsRouterModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN,
          useValue: settings ?? {}
        }
      ]
    };
  }
}
