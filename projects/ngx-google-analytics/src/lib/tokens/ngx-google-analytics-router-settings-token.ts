import { InjectionToken } from '@angular/core';
import { IGoogleAnalyticsRoutingSettings } from '../interfaces/i-google-analytics-routing-settings';

/**
 * Provide a Injection Token to global settings.
 */
export const NGX_GOOGLE_ANALYTICS_ROUTING_SETTINGS_TOKEN = new InjectionToken<IGoogleAnalyticsRoutingSettings>('ngx-google-analytics-routing-settings', {
  factory: () => ({})
});
