import { Directive, Host, Optional, Input } from '@angular/core';
import { GaEventDirective } from './ga-event.directive';
import { GaBind } from '../types/ga-bind.type';

@Directive({
  selector: `input[gaEvent],
             select[gaEvent],
             textarea[gaEvent]`
})
export class GaEventFormInputDirective {

  constructor(
    @Host() @Optional() protected gaEvent: GaEventDirective
  ) {
    this.gaBind = 'focus';
  }

  @Input() set gaBind(bind: GaBind) {
    if (this.gaEvent) {
      this.gaEvent.gaBind = bind;
    }
  }

}
