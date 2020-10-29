import { Provider, APP_INITIALIZER, isDevMode } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';
import { IGoogleAnalyticsCommand } from '../interfaces/i-google-analytics-commant';
import { NGX_GTAG_FN } from '../tokens/ngx-gtag-token';
import { GtagFn } from '../types/gtag.type';
import { DOCUMENT } from '@angular/common';

/**
 * Provide a DI Configuration to attach GA Initialization at Angular Startup Cycle.
 */
export const NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: GoogleAnalyticsInitializer,
  deps: [
    NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
    NGX_GTAG_FN,
    DOCUMENT
  ]
};

/**
 * Create a script element on DOM and link it to Google Analytics tracking code URI.
 * After that, execute exactly same init process as tracking snippet code.
 */
export function GoogleAnalyticsInitializer(
  settings: IGoogleAnalyticsSettings,
  gtag: GtagFn,
  document: Document
) {
  return async () => {
    if (!settings.trackingCode) {
      if (!isDevMode()) {
        console.error('Empty tracking code for Google Analytics. Make sure to provide one when initializing NgxGoogleAnalyticsModule.');
      }

      return;
    }

    if (!gtag) {
      if (!isDevMode()) {
        console.error('Was not possible create or read gtag() fn. Make sure this module is running on a Browser w/ access to Window interface.');
      }

      return;
    }

    if (!document) {
      if (!isDevMode()) {
        console.error('Was not possible to access Document interface. Make sure this module is running on a Browser w/ access do Document interface.');
      }
    }

    // Set default ga.js uri
    settings.uri = settings.uri || `https://www.googletagmanager.com/gtag/js?id=${settings.trackingCode}`;

    // these commands should run first!
    const initialCommands: Array<IGoogleAnalyticsCommand> = [
      { command: 'js', values: [ new Date() ] },
      { command: 'config', values: [ settings.trackingCode ] }
    ];

    settings.initCommands = [ ...initialCommands, ...(settings.initCommands || []) ];

    for (const command of settings.initCommands) {
      gtag(command.command, ...command.values);
    }

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    s.src = settings.uri;

    if (settings.nonce) {
      s.nonce = settings.nonce;
    }

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
  };
}
