import { Directive, Optional, Input, HostListener, OnInit, isDevMode, Inject } from '@angular/core';
import { GaEventCategoryDirective } from './ga-event-category.directive';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { GaBind } from '../types/ga-bind.type';
import { GaAction } from '../types/ga-action.type';
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from '../tokens/ngx-google-analytics-settings-token';
import { IGoogleAnalyticsSettings } from '../interfaces/i-google-analytics-settings';

@Directive({
  selector: `[gaEvent]`,
  exportAs: 'gaEvent'
})
export class GaEventDirective implements OnInit {

  constructor(
    @Optional() private gaCategoryDirective: GaEventCategoryDirective,
    private gaService: GoogleAnalyticsService,
    @Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) private settings: IGoogleAnalyticsSettings
  ) {
  }

  @Input() gaAction: GaAction | string;
  @Input() gaLabel: string;
  @Input() label: string;
  @Input() gaValue: number;
  @Input() gaInteraction: boolean;
  @Input() gaBind: GaBind = 'click';
  @Input() gaEvent: GaAction | string;

  ngOnInit() {
  }

  @HostListener('click')
  onClick() {
    if (this.gaBind === 'click') {
      this.trigger();
    }
  }

  @HostListener('focus')
  onFocus() {
    if (this.gaBind === 'focus') {
      this.trigger();
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.gaBind === 'blur') {
      this.trigger();
    }
  }

  protected trigger() {
    try {
      // Observação: não é obrigatório especificar uma categoria, uma etiqueta ou um valor. Consulte Eventos padrão do Google Analytics abaixo.
      // if (!this.$gaCategoryDirective) {
      //   throw new Error('You must provide a gaCategory attribute w/ gaEvent Directive.');
      // }

      if (!this.gaAction && !this.gaEvent) {
        throw new Error('You must provide a gaAction atrribute to identify this event.');
      }

      this.gaService
          .event(
            this.gaAction || this.gaEvent,
            (this.gaCategoryDirective) ? this.gaCategoryDirective.gaCategory : undefined,
            this.gaLabel || this.label,
            this.gaValue,
            this.gaInteraction
          );
    } catch (err) {
      this.throw(err);
    }
  }

  protected throw(err: Error) {
    if ((isDevMode() || this.settings.ennableTracing) && console && console.warn) {
      console.warn(err);
    }
  }

}
