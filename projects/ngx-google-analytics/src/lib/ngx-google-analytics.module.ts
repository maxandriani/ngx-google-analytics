import { NgModule, ModuleWithProviders } from '@angular/core';
import { IGoogleAnalyticsCommand } from './interfaces/i-google-analytics-commant';
import { NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER } from './initializers/google-analytics.initializer';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from './tokens/ngx-google-analytics-settings-token';
import { GaEventDirective } from './directives/ga-event.directive';
import { GaEventCategoryDirective } from './directives/ga-event-category.directive';
import { GaEventFormInputDirective } from './directives/ga-event-form-input.directive';

@NgModule({
  imports: [
  ],
  declarations: [GaEventDirective, GaEventCategoryDirective, GaEventFormInputDirective],
  exports: [GaEventDirective, GaEventCategoryDirective, GaEventFormInputDirective]
})
export class NgxGoogleAnalyticsModule {
  static forRoot(trackingCode: string, commands: IGoogleAnalyticsCommand[] = [], uri?: string): ModuleWithProviders {
    return {
      ngModule: NgxGoogleAnalyticsModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
          useValue: {
            trackingCode: trackingCode,
            commands: commands,
            uri: uri
          }
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER,
      ]
    };
  }
}
