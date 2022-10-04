import { APP_BOOTSTRAP_LISTENER, ComponentRef, Provider } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs/operators';
import { IGoogleAnalyticsRoutingSettings } from '../interfaces/i-google-analytics-routing-settings';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-router-settings-token';

/**
 * Provide a DI Configuration to attach GA Trigger to Router Events at Angular Startup Cycle.
 */
export const NGX_GOOGLE_ANALYTICS_ROUTER_INITIALIZER_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: GoogleAnalyticsRouterInitializer,
  deps: [
    NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN,
    GoogleAnalyticsService
  ]
};

/**
 * Attach a listener to `NavigationEnd` Router event. So, every time Router finish the page resolution it should call `NavigationEnd` event.
 * We assume that NavigationEnd is the final page resolution and call GA `page_view` command.
 *
 * To avoid double binds, we also destroy the subscription when de Bootstrap Component is destroied. But, we don't know for sure
 * that this strategy does not cause double bind on multiple bootstrap components.
 *
 * We are using the component's injector reference to resolve Router, so I hope there is no problem with double binding.
 *
 * If you have this problem, I encourage not Use NgxGoogleAnalyticsRouterModule and atach the listener on AppComponent initialization.
 */
export function GoogleAnalyticsRouterInitializer(
  settings: IGoogleAnalyticsRoutingSettings,
  gaService: GoogleAnalyticsService
) {
  return async (c: ComponentRef<any>) => {
    const router = c.injector.get(Router);
    const { include = [], exclude = [] } = settings ?? {};
    const includeRules = normalizePathRules(include);
    const excludeRules = normalizePathRules(exclude);
    const subs = router
      .events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        skip(1), // Prevend double views on the first tigger (because GA Already send one ping on setup)
        filter(event => includeRules.length > 0
          ? includeRules.some(rule => rule.test(event.urlAfterRedirects))
          : true),
        filter(event => excludeRules.length > 0
          ? !excludeRules.some(rule => rule.test(event.urlAfterRedirects))
          : true)
      )
      .subscribe(event => gaService.pageView(event.urlAfterRedirects, undefined));
    // Cleanup
    c.onDestroy(() => subs.unsubscribe());
  };
}

/** Converts all path rules from string to Regex instances */
function normalizePathRules(rules: Array<string | RegExp>): Array<RegExp> {
  return rules.map(rule => (rule instanceof RegExp)
    ? rule
    : new RegExp(`^${rule.replace('*', '.*')}$`, 'i'));
}
