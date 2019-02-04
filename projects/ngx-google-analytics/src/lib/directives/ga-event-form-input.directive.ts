import { Directive, Host, Optional, OnInit, Input } from '@angular/core';
import { GaEventDirective } from './ga-event.directive';
import { GaBind } from '../types/ga-bind.type';

@Directive({
  selector: `input[gaEvent],
             select[gaEvent],
             textarea[gaEvent]`
})
export class GaEventFormInputDirective implements OnInit {

  constructor(
    @Host() @Optional() protected $gaEvent: GaEventDirective
  ) { }

  @Input() gaBind: GaBind;

  ngOnInit() {
    if (this.$gaEvent) {
      this.$gaEvent.gaBind = (this.gaBind)
                              ? this.$gaEvent.gaBind
                              : 'focus';
    }
  }

}
