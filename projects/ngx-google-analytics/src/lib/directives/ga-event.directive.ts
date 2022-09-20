import {Directive, ElementRef, Inject, Input, isDevMode, OnDestroy, Optional} from '@angular/core';
import {GaEventCategoryDirective} from './ga-event-category.directive';
import {GoogleAnalyticsService} from '../services/google-analytics.service';
import {GaActionEnum} from '../enums/ga-action.enum';
import {NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN} from '../tokens/ngx-google-analytics-settings-token';
import {IGoogleAnalyticsSettings} from '../interfaces/i-google-analytics-settings';
import {fromEvent, Subscription} from 'rxjs';

@Directive({
  selector: `[gaEvent]`,
  exportAs: 'gaEvent'
})
export class GaEventDirective implements OnDestroy {

  constructor(
    @Optional() private gaCategoryDirective: GaEventCategoryDirective,
    private gaService: GoogleAnalyticsService,
    @Inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN) private settings: IGoogleAnalyticsSettings,
    private readonly el: ElementRef
  ) {
    this.gaBind = 'click';
  }

  private bindSubscription?: Subscription;

  @Input() gaAction!: GaActionEnum | string;
  @Input() gaLabel!: string;
  @Input() label!: string;
  @Input() gaValue!: number;
  @Input() gaInteraction!: boolean;
  @Input() gaEvent!: GaActionEnum | string;

  private _gaBind!: string;

  @Input() set gaBind (gaBind: string) {
    if (this.bindSubscription) {
      this.bindSubscription.unsubscribe();
    }

    this._gaBind = gaBind;
    this.bindSubscription = fromEvent(this.el.nativeElement, gaBind).subscribe(() => this.trigger());
  }
  get gaBind(): string {
    return this._gaBind;
  }

  ngOnDestroy() {
    if (this.bindSubscription) {
      this.bindSubscription.unsubscribe();
    }
  }

  protected trigger() {
    try {
      // Observação: não é obrigatório especificar uma categoria, uma etiqueta ou um valor. Consulte Eventos padrão do Google Analytics abaixo.
      // if (!this.$gaCategoryDirective) {
      //   throw new Error('You must provide a gaCategory attribute w/ gaEvent Directive.');
      // }

      if (!this.gaAction && !this.gaEvent) {
        throw new Error('You must provide a gaAction attribute to identify this event.');
      }

      this.gaService
          .event(
            this.gaAction || this.gaEvent,
            (this.gaCategoryDirective) ? this.gaCategoryDirective.gaCategory : undefined,
            this.gaLabel || this.label,
            this.gaValue,
            this.gaInteraction
          );
    } catch (err: any) {
      this.throw(err);
    }
  }

  protected throw(err: Error) {
    if ((isDevMode() || this.settings.enableTracing) && console && console.warn) {
      console.warn(err);
    }
  }

}
