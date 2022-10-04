import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, isDevMode } from '@angular/core';
import { GaActionEnum } from '../enums/ga-action.enum';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';
import { IGoogleAnalyticsServiceAppView, IGoogleAnalyticsServiceEvent, IGoogleAnalyticsServicePageView } from '../interfaces/i-google-analytics-sevice';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { NGX_GTAG_FN } from '../tokens/ngx-gtag-token';
import { GtagFn } from '../types/gtag.type';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  private get document(): Document {
    return this._document;
  }

  constructor(
    @Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) private readonly settings: IGoogleAnalyticsSettings,
    @Inject(DOCUMENT) private readonly _document: any,
    @Inject(NGX_GTAG_FN) private readonly _gtag: GtagFn
  ) { }

  private throw(err: Error) {
    if ((this.settings.enableTracing || isDevMode()) && console && console.error) {
      console.error(err);
    }
  }

  private toKeyValue(map: Map<string, any>): { [param: string]: any } | undefined {
    if (map.size) // > 0
      return Object.fromEntries(map);
  }

  /**
   * Call native GA Tag
   */
  gtag(...args: any[]) {
    try {
      this._gtag(...args.filter(x => x !== undefined));
    } catch (err: any) {
      this.throw(err);
    }
  }

  /**
   * Send an event trigger to GA. This is the same as:
   * ```js
   * gtag('event', 'video_auto_play_start', {
   *   'event_label': 'My promotional video',
   *   'event_category': 'video_auto_play'
   * });
   * ```
   *
   * @param action 'video_auto_play_start'
   * @param options event options (category, label, value, interaction, [custom dimensions] options)
   */
  event(action: GaActionEnum | string, options?: IGoogleAnalyticsServiceEvent) {
    try {
      const opt = new Map<string, any>();
      if (options.category !== undefined) {
        opt.set('event_category', options.category);
      }
      if (options.label !== undefined) {
        opt.set('event_label', options.label);
      }
      if (options.value !== undefined) {
        opt.set('value', options.value);
      }
      if (options.interaction !== undefined) {
        opt.set('interaction', options.interaction);
      }
      if (options.options !== undefined) {
        Object
          .entries(options.options)
          .map(([key, value]) => opt.set(key, value));
      }
      const params = this.toKeyValue(opt);
      if (params) {
        this.gtag('event', action as string, params);
      } else {
        this.gtag('event', action as string);
      }
    } catch (error: any) {
      this.throw(error);
    }
  }

  /**
   * Send a page view event. This is the same as:
   *
   * ```js
   * gtag('config', 'GA_TRACKING_ID', {
   *   'page_title' : 'Homepage',
   *   'page_path': '/home'
   * });
   * ```
   *
   * The tracking ID is injected automatically by Inject Token NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN
   *
   * @param path /home
   * @param options pageView options (title, location, [custom dimensions] options)
   */
  pageView(path: string, options?: IGoogleAnalyticsServicePageView) {
    try {
      const opt = new Map<string, any>([['page_path', path]]);
      if (options.title !== undefined) {
        opt.set('page_title', options.title);
      }
      if (options.location !== undefined || this.document) {
        opt.set('page_location', (options.location || this.document.location.href));
      }
      if (options.options !== undefined) {
        Object
          .entries(options.options)
          .map(([key, value]) => opt.set(key, value));
      }
      this.gtag('config', this.settings.trackingCode, this.toKeyValue(opt));
    } catch (error: any) {
      this.throw(error);
    }
  }

  /**
   * Send an event to report a App Page View. This is the same as:
   *
   * ```js
   * gtag('event', 'screen_view', {
   *   'app_name': 'myAppName',
   *   'screen_name' : 'Home'
   * });
   *
   * ```
   *
   * @param screen 'screen_name'
   * @param appName 'app_name'
   * @param options appView options (appId, appVersion, installerId)
   */
  appView(screen: string, appName: string, options?: IGoogleAnalyticsServiceAppView) {
    try {
      const opt = new Map<string, any>([['screen_name', screen], ['app_name', appName]]);
      if (options.appId !== undefined) {
        opt.set('app_id', options.appId);
      }
      if (options.appVersion !== undefined) {
        opt.set('app_version', options.appVersion);
      }
      if (options.installerId !== undefined) {
        opt.set('app_installer_id', options.installerId);
      }
      this.gtag('event', 'screen_view', this.toKeyValue(opt));
    } catch (error: any) {
      this.throw(error);
    }
  }

  /**
   * Defines persistent values on GoogleAnalytics
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/setting-values
   *
   * ```js
   * gtag('set', {
   *   'currency': 'USD',
   *   'country': 'US'
   * });
   * ```
   */
  set(...options: Array<any>) {
    try {
      this._gtag('set', ...options);
    } catch (err: any) {
      this.throw(err);
    }
  }

  /**
   * Send an event to GA to report an application error. This is the same as:
   *
   * ```js
   * gtag('event', 'exception', {
   *   'description': 'error_description',
   *   'fatal': false   // set to true if the error is fatal
   * });
   * ```
   *
   * @param description 'error_description'
   * @param fatal set to true if the error is fatal
   */
  exception(description?: string, fatal?: boolean) {
    try {
      const opt = new Map<string, any>();
      if (description !== undefined) {
        opt.set('description', description);
      }
      if (fatal !== undefined) {
        opt.set('fatal', fatal);
      }
      const params = this.toKeyValue(opt);
      if (params) {
        this.gtag('event', 'exception', this.toKeyValue(opt));
      } else {
        this.gtag('event', 'exception');
      }
    } catch (error: any) {
      this.throw(error);
    }
  }
}
