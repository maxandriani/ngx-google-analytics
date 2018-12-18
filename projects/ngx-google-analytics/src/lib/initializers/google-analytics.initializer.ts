import { Provider, APP_INITIALIZER, isDevMode } from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';
import { IGoogleAnalyticsCommand } from '../interfaces/i-google-analytics-commant';

export const NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: GoogleAnalyticsInitializer,
  deps: [
    NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN
  ]
};

export function GoogleAnalyticsInitializer(
  $settings: IGoogleAnalyticsSettings
) {
  return async () => {
    if (!$settings.trackingCode) {
      if (!isDevMode()) {
        console.error('Empty tracking code for Google Analytics. Make sure to provide one when initializing NgxGoogleAnalyticsModule.');
      }

      return;
    }

    // Set default ga.js uri
    $settings.uri = $settings.uri || `https://www.googletagmanager.com/gtag/js?id=${$settings.trackingCode}`;

    // these commands should run first!
    const initialCommands: Array<IGoogleAnalyticsCommand> = [
      { command: 'js', values: [ new Date() ] },
      { command: 'config', values: [ $settings.trackingCode ] }
    ];

    $settings.initCommands = [ ...initialCommands, ...($settings.initCommands || []) ];

    window['dataLayer'] = window['dataLayer'] || [];
    window['gtag'] = window['gtag'] || function () {
      window['dataLayer'].push(arguments);
    };

    for (const command of $settings.initCommands) {
      window['gtag'](command.command, ...command.values);
    }

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    s.src = $settings.uri;

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
  };
}
