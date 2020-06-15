import { NgModule, ModuleWithProviders } from '@angular/core';
import { IGoogleAnalyticsCommand } from './interfaces/i-google-analytics-commant';
import { NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER } from './initializers/google-analytics.initializer';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from './tokens/ngx-google-analytics-settings-token';
import { GaEventDirective } from './directives/ga-event.directive';
import { GaEventCategoryDirective } from './directives/ga-event-category.directive';
import { GaEventFormInputDirective } from './directives/ga-event-form-input.directive';

/**
 * Install Google Analytics Tracking code on your environment and configure tracking ID.
 *
 * This module should be a dependency on the higest level module of the applicadion, ie AppModule on most use cases.
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
   * You should provide a valid Google TrackingCode. This code will be provided to the entire application by
   * `NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN` token. You can inject this code in you componentes if you like by
   * use the following injection code `@Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) gaCongig: IGoogleAnalyticsSettings`
   *
   * @param trackingCode The Google Tracking Code
   * @param commands When placed, it will run any GA Commangs in sequence after setup GA environment.
   * @param uri When placed, it will change the default js URI to the provided one.
   */
  static forRoot(trackingCode: string, commands: IGoogleAnalyticsCommand[] = [], uri?: string, enableTracing?: boolean): ModuleWithProviders<NgxGoogleAnalyticsModule> {
    return {
      ngModule: NgxGoogleAnalyticsModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
          useValue: {
            trackingCode,
            commands,
            uri,
            enableTracing
          }
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER,
      ]
    };
  }
}
