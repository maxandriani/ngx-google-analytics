import { Directive, Host, Optional, Input, HostListener, OnInit } from '@angular/core';
import { GaEventCategoryDirective } from './ga-event-category.directive';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { GaActionEnum } from '../enums/ga-action.enum';
import { GaBind } from '../types/ga-bind.type';

@Directive({
  selector: `[gaEvent]`,
  exportAs: 'gaEvent'
})
export class GaEventDirective implements OnInit {

  constructor(
    @Host() @Optional() protected $gaCategoryDirective: GaEventCategoryDirective,
    protected $gaService: GoogleAnalyticsService
  ) {
  }

  @Input() gaAction: GaActionEnum | string;
  @Input() gaLabel: string;
  @Input() label: string;
  @Input() gaValue: number;
  @Input() gaInteraction: boolean;
  @Input() gaBind: GaBind = 'click';

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
      if (!this.$gaCategoryDirective) {
        throw new Error('You must provide a gaCategory attribute w/ gaEvent Directive.');
      }

      if (!this.gaAction) {
        throw new Error('You must provide a gaAction atrribute to identify this event.');
      }

      this.$gaService
          .event(
            this.gaAction,
            this.$gaCategoryDirective.gaCategory,
            this.gaLabel || this.label,
            this.gaValue,
            this.gaInteraction
          );
    } catch (err) {
      this.throw(err);
    }
  }

  protected throw(err: Error) {
    if (console && console.warn) {
      console.warn(err);
    }
  }

}
