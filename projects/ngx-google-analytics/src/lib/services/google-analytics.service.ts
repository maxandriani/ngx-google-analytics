import { Injectable, Inject } from '@angular/core';
import { GaActionEnum } from '../enums/ga-action.enum';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    @Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) protected $trackingId: IGoogleAnalyticsSettings
  ) { }

  event(action: GaActionEnum | string, category?: string, label?: string, value?: string) {
    try {
      if (window['gtag']) {
        const options = {};
        if (category) {
          options['category'] = category;
        }
        if (label) {
          options['label'] = label;
        }
        if (value) {
          options['value'] = value;
        }
        window['gtag']('event', action, options);
      }
    } catch (error) {
      console.error(error);
    }
  }

  pageView(title ?: string, location ?: string, path ?: string) {
    try {
      if (window['gtag']) {
        const options = {};
        if (title) {
          options['title'] = title;
        }
        if (location) {
          options['location'] = location;
        }
        if (path) {
          options['path'] = path;
        }
        window['gtag']('config', this.$trackingId, options);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
