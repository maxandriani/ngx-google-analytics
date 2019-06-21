import { Provider, APP_BOOTSTRAP_LISTENER, ComponentRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

export const NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: GoogleAnalyticsRouterInitializer,
  deps: [
    GoogleAnalyticsService,
    Router
  ]
};

export function GoogleAnalyticsRouterInitializer(
  $gaService: GoogleAnalyticsService,
  $router: Router
) {
  return async (c: ComponentRef<any>) => {
    $router
      .events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          $gaService.pageView(event.urlAfterRedirects, undefined, document.location.href);
        }
      });
  };
}
