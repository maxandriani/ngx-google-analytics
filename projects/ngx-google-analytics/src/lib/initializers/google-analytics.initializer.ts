import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, isDevMode, Provider } from '@angular/core';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { NGX_GTAG_FN } from '../tokens/ngx-gtag-token';
import { GtagFn } from '../types/gtag.type';

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
        console.error('Could\'nt create or read gtag() fn. Make sure this module is running on a Browser w/ access to Window interface.');
      }

      return;
    }

    if (!document) {
      if (!isDevMode()) {
        console.error('Could\'nt to access Document interface. Make sure this module is running on a Browser w/ access to Document interface.');
      }
    }

    // Set default ga.js uri
    settings.uri = settings.uri || `https://www.googletagmanager.com/gtag/js?id=${settings.trackingCode}`;

    // these commands should run first!
    settings.initCommands = settings?.initCommands ?? [];

    // assert config command
    if (!settings.initCommands.find(x => x.command === 'config')) {
      settings.initCommands.unshift({ command: 'config', values: [settings.trackingCode] });
    }

    // assert js command
    if (!settings.initCommands.find(x => x.command === 'js')) {
      settings.initCommands.unshift({ command: 'js', values: [new Date()] });
    }

    for (const command of settings.initCommands) {
      gtag(command.command, ...command.values);
    }

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    s.src = settings.uri;

    if (settings.nonce) {
      s.setAttribute('nonce', settings.nonce);
    }

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
  };
}
