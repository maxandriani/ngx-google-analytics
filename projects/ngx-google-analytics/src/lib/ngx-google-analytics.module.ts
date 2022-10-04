import { ModuleWithProviders, NgModule } from '@angular/core';
import { GaEventCategoryDirective } from './directives/ga-event-category.directive';
import { GaEventFormInputDirective } from './directives/ga-event-form-input.directive';
import { GaEventDirective } from './directives/ga-event.directive';
import { NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER } from './initializers/google-analytics.initializer';
import { IGoogleAnalyticsModuleSettings, IGoogleAnalyticsSettings } from './interfaces/i-google-analytics-settings';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from './tokens/ngx-google-analytics-settings-token';

/**
 * Install Google Analytics Tracking code on your environment and configure tracking ID.
 *
 * This module should be a dependency on the highest level module of the application, i.e. AppModule in most use cases.
 */
@NgModule({
  imports: [
  ],
  declarations: [
    GaEventDirective,
    GaEventCategoryDirective,
    GaEventFormInputDirective
  ],
  exports: [
    GaEventDirective,
    GaEventCategoryDirective,
    GaEventFormInputDirective
  ]
})
export class NgxGoogleAnalyticsModule {
  /**
   * You should provide a valid GA Tracking Code. This code will be provided to the entire application by
   * `NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN` token. You can inject this code in you components if you like by
   * use the following injection code `@Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) gaConfig: IGoogleAnalyticsSettings`
   *
   * @param trackingCode The Google Tracking Code
   * @param options Module options
   */
  static forRoot(trackingCode: string, options?: IGoogleAnalyticsModuleSettings): ModuleWithProviders<NgxGoogleAnalyticsModule> {
    return {
      ngModule: NgxGoogleAnalyticsModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
          useValue: {
            trackingCode,
            ...options
          } as IGoogleAnalyticsSettings
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER,
      ]
    };
  }
}
