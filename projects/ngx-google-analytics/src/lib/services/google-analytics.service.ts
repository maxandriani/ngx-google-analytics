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
        const opt = {};
        if (category) {
          opt['category'] = category;
        }
        if (label) {
          opt['label'] = label;
        }
        if (value) {
          opt['value'] = value;
        }
        window['gtag']('event', action, opt);
      }
    } catch (error) {
      console.error(error);
    }
  }

  pageView( path ?: string, title ?: string, location ?: string, options?: Object) {
    try {
      if (window['gtag']) {
        const opt = {};
        if (path) {
          opt['page_path'] = path;
        }
        if (title) {
          opt['page_title'] = title;
        }
        if (location) {
          opt['page_location'] = location;
        }
        if (options) {
          Object.assign(opt, options);
        }
        window['gtag']('config', this.$trackingId.trackingCode, opt);
      }
    } catch (error) {
      console.error(error);
    }
  }

  appView(screen: string, name: string, id?: string, version?: string, installer_id?: string) {
    try {
      if (window['gtag']) {
        const opt = {};
        if (screen) {
          opt['screen_name'] = screen;
        }
        if (name) {
          opt['app_name'] = name;
        }
        if (id) {
          opt['app_id'] = id;
        }
        if (version) {
          opt['app_version'] = version;
        }
        if (installer_id) {
          opt['app_installer_id'] = installer_id;
        }
        window['gtag']('event', 'screen_view', opt);
      }
    } catch (error) {
      console.error(error);
    }
  }

  exception(description?: string, fatal?: boolean) {
    try {
      if (window['gtag']) {
        const opt = {};
        if (description) {
          opt['description'] = description;
        }
        if (fatal) {
          opt['fatal'] = fatal;
        }
        window['gtag']('event', 'exception', opt);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
