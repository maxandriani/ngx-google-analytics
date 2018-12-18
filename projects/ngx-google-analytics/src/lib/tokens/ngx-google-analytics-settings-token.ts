import { InjectionToken } from '@angular/core';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';

export const NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN = new InjectionToken<IGoogleAnalyticsSettings>('ngx-hotjar-settings', {
  factory: () => ({ trackingCode: '' })
});
