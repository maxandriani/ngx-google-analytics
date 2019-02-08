import { Injectable, Inject } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';
import { GaAction } from '../types/ga-action.type';
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    @Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) protected $trackingId: IGoogleAnalyticsSettings
  ) { }

  protected throw(err: Error) {
    if (console && console.error) {
      console.error(err);
    }
  }

  /**
   * Call native GA Tag
   *
   * @param action config|event
   * @param command Action specialization
   * @param options Command configuration
   */
  gtag(action: string, command: string, ...options: Array<any>) {
    try {
      window['gtag'](action, command, ...options);
    } catch (err) {
      this.throw(err);
    }
  }

  /**
   * Send an event trigger to GA. It is the same as call:
   * ```js
   * gtag('event', 'video_auto_play_start', {
   *   'event_label': 'My promotional video',
   *   'event_category': 'video_auto_play'
   * });
   * ```
   *
   * @param action 'video_auto_play_start'
   * @param category 'video_auto_play'
   * @param label 'My promotional video'
   * @param value An value to measure something
   */
  event(action: GaAction | string, category?: string, label?: string, value?: number, interaction?: boolean) {
    try {
      if (window['gtag']) {
        const opt = {};
        if (category) {
          opt['event_category'] = category;
        }
        if (label) {
          opt['event_label'] = label;
        }
        if (value) {
          opt['value'] = value;
        }
        if (interaction !== undefined) {
          opt['interaction'] = interaction;
        }
        this.gtag('event', action as string, opt);
      }
    } catch (error) {
      this.throw(error);
    }
  }

  /**
   * Send an page view event. This is the same as
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
   * @param title Homepage
   * @param location '{ page_location }'
   * @param options '{ ... custom dimentions }'
   */
  pageView( path?: string, title?: string, location?: string, options?: Object) {
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
        this.gtag('config', this.$trackingId.trackingCode, opt);
      }
    } catch (error) {
      this.throw(error);
    }
  }

  /**
   * Send an evento to report a App Page View. It is the same as
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
   * @param name 'app_name'
   * @param appId 'app_id'
   * @param appVersion 'app_version'
   * @param installerId 'app_installer_id'
   */
  appView(screen: string, appName: string, appId?: string, appVersion?: string, installerId?: string) {
    try {
      if (window['gtag']) {
        const opt = {};
        if (screen) {
          opt['screen_name'] = screen;
        }
        if (appName) {
          opt['app_name'] = appName;
        }
        if (appId) {
          opt['app_id'] = appId;
        }
        if (appVersion) {
          opt['app_version'] = appVersion;
        }
        if (installerId) {
          opt['app_installer_id'] = installerId;
        }
        this.gtag('event', 'screen_view', opt);
      }
    } catch (error) {
      this.throw(error);
    }
  }

  /**
   * Send an event to GA to report an application error. It is the same as
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
      if (window['gtag']) {
        const opt = {};
        if (description) {
          opt['description'] = description;
        }
        if (fatal) {
          opt['fatal'] = fatal;
        }
        this.gtag('event', 'exception', opt);
      }
    } catch (error) {
      this.throw(error);
    }
  }
}
